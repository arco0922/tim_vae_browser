import {
  EncodeResult,
  TimbreVAE,
} from '@app/utils/TimbreVAE';
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import styles from './PracticeAudioVisualizer.module.scss';
import dynamic from 'next/dynamic';
import { url } from '@app/utils/urlConfig';
import {
  VisualizerConfig,
  WorkletMessage,
} from '@app/constants/visualizerConfig';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import { Annotations, NumVector } from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import {
  repSoundCoords,
  RepSoundId,
} from '@app/constants/repSounds';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import { Button } from '@app/components/Button';
import { PracticeConfig } from '@app/constants/practiceConfig';
import { DrawPracticeFeedbackSketchProps } from '@app/sketches/DrawPracticeFeedbackSketch';
import { DrawSamplingPointsSketchProps } from '@app/sketches/DrawSamplingPointsSketch';

const DrawSamplingPointsSketch =
  dynamic<DrawSamplingPointsSketchProps>(
    () =>
      import('@app/sketches/DrawSamplingPointsSketch').then(
        (module) => module.DrawSamplingPointsSketch,
      ) as any,
    { ssr: false },
  );

const DrawPracticeFeedbackSketch =
  dynamic<DrawPracticeFeedbackSketchProps>(
    () =>
      import(
        '@app/sketches/DrawPracticeFeedbackSketch'
      ).then(
        (module) => module.DrawPracticeFeedbackSketch,
      ) as any,
    { ssr: false },
  );

const HIST_LENGTH = 20;
const EMA_ALPHA = 2 / (HIST_LENGTH + 1);

const sketchWidth = 500;

export interface PracticeAudioVisualizerProps<
  P extends WorkletMessage,
> {
  practiceConfig: PracticeConfig;
  visualizerConfig: VisualizerConfig<P>;
  annotations: Annotations;
  className?: string;
}

export const PracticeAudioVisualizer = <
  P extends WorkletMessage,
>({
  practiceConfig,
  visualizerConfig,
  annotations,
  className,
}: PracticeAudioVisualizerProps<P>) => {
  const [audioContext, setAudioContext] =
    React.useState<AudioContext | null>(null);

  /**
   * Setup Audio Context
   */
  React.useEffect(() => {
    if (audioContext !== null) return;
    window.AudioContext =
      window.AudioContext || window.webkitAudioContext;
    const _audioCtx = new AudioContext();
    setAudioContext(_audioCtx);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [audioSource, setAudioSource] =
    React.useState<MediaStreamAudioSourceNode | null>(null);

  /**
   * Setup Microphone Source
   */
  React.useEffect(() => {
    if (
      audioContext === null ||
      audioSource !== null ||
      navigator.mediaDevices.getUserMedia === undefined
    )
      return;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const _source =
          audioContext.createMediaStreamSource(stream);
        setAudioSource(_source);
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioContext]);

  const [resampleProcessor, setResampleProcessor] =
    React.useState<AudioWorkletNode | null>(null);

  /**
   * Setup Resample Worklet
   */
  React.useEffect(() => {
    if (audioContext === null || resampleProcessor !== null)
      return;
    const setupResampleWorklet = async () => {
      await audioContext.audioWorklet.addModule(
        visualizerConfig.encoderMode === 'LONG_FAST'
          ? url('/worklet-scripts/resample_mel.worklet.js')
          : url('/worklet-scripts/resample.worklet.js'),
      );
      const _resampleProcessor = new AudioWorkletNode(
        audioContext,
        visualizerConfig.encoderMode === 'LONG_FAST'
          ? 'resample-mel.worklet'
          : 'resample.worklet',
        {
          parameterData: {
            bufferSize: visualizerConfig.frameLength,
            resampleRate: visualizerConfig.samplingRate,
          },
        },
      );
      setResampleProcessor(_resampleProcessor);
    };
    setupResampleWorklet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioContext, visualizerConfig]);

  /**
   * Setup AudioGraph
   */
  React.useEffect(() => {
    if (
      audioContext === null ||
      audioSource === null ||
      resampleProcessor === null
    )
      return;
    audioSource.connect(resampleProcessor);
  }, [audioContext, audioSource, resampleProcessor]);

  const [timbreVAE, setTimbreVAE] =
    React.useState<TimbreVAE<P> | null>(null);

  const [encodeResult, setEncodeResult] =
    React.useState<EncodeResult | null>(null);

  /**
   * Setup Timbre VAE
   */
  React.useEffect(() => {
    const setupVAE = async () => {
      const encoder = await tf.loadGraphModel(
        url(visualizerConfig.encoderJSONPath),
      );
      const _timbreVAE = new TimbreVAE(
        visualizerConfig.isFlipped,
        encoder,
        visualizerConfig.encoderPreprocessor,
        setEncodeResult,
      );
      setTimbreVAE(_timbreVAE);
    };
    setupVAE();
  }, [visualizerConfig]);

  const [isSilence, setIsSilence] = React.useState(true);

  /**
   * Setup Connection between TimbreVAE and AudioGraph
   */
  React.useEffect(() => {
    if (resampleProcessor === null || timbreVAE === null)
      return;
    resampleProcessor.port.onmessage = async (e: {
      data: P | null;
    }) => {
      if (e.data === null) {
        setIsSilence(true);
        return;
      }
      setIsSilence(false);
      timbreVAE.encodeAudio(e.data);
    };
  }, [resampleProcessor, timbreVAE]);

  const [encodeResultHist, setEncodeResultHist] =
    React.useState<EncodeResult[]>([]);

  const [coordEMA, setCoordEMA] =
    React.useState<EncodeResult | null>(null);

  /**
   * Update Encode Result History
   */
  React.useEffect(() => {
    if (encodeResult === null) return;
    const tmp = [...encodeResultHist, encodeResult];
    const newHist =
      tmp.length <= HIST_LENGTH ? tmp : tmp.slice(1);
    setEncodeResultHist(newHist);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodeResult]);

  /**
   * Update EMA
   */
  React.useEffect(() => {
    const histLen = encodeResultHist.length;
    if (histLen === 0) return;
    const lastResult = encodeResultHist[histLen - 1];

    if (coordEMA === null || histLen < HIST_LENGTH) {
      const avgCoord = [];
      for (let i = 0; i < lastResult.coord.length; i++) {
        let s = 0;
        for (let j = 0; j < histLen; j++) {
          s = s + encodeResultHist[j].coord[i];
        }
        avgCoord.push(s / histLen);
      }
      setCoordEMA({ coord: avgCoord });
    } else {
      const newEMACoord = coordEMA.coord.map(
        (val, i) =>
          val * (1 - EMA_ALPHA) +
          lastResult.coord[i] * EMA_ALPHA,
      );
      setCoordEMA({ coord: newEMACoord });
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodeResultHist]);

  const [isRunning, setIsRunning] =
    React.useState<boolean>(false);

  /**
   * AudioContext must be resumed manually by user
   */
  const resumeContext = React.useCallback(() => {
    setIsRunning(true);
    if (
      audioContext === null ||
      audioContext.state === 'running'
    )
      return;
    audioContext.resume();
  }, [audioContext]);

  const suspendContext = React.useCallback(() => {
    setIsRunning(false);
    if (
      audioContext === null ||
      audioContext.state === 'suspended'
    )
      return;
    audioContext.suspend();
  }, [audioContext]);

  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [annotationCount, setAnnotationCount] =
    React.useState(0);

  const [
    estimatedSamplingPoints,
    setEstimatedSamplingPoints,
  ] = React.useState<NumVector[] | null>(null);

  React.useEffect(() => {
    if (practiceConfig.mode !== 'SHAPE') return;
    const _delaunayEstimator = new DelaunayEstimator(
      delaunayConfig.inputDim,
      delaunayConfig.outputDim,
    );
    setDelaunayEstimator(_delaunayEstimator);
  }, [practiceConfig.mode]);

  React.useEffect(() => {
    if (
      delaunayEstimator === null ||
      annotations === undefined
    )
      return;
    let _annotationCount = 0;
    for (const [_rsId, vector] of Object.entries(
      annotations,
    )) {
      const _repSoundId = _rsId as RepSoundId;
      const coord = repSoundCoords[_repSoundId];
      delaunayEstimator.addPoint(coord, vector);
      _annotationCount += 1;
    }
    setAnnotationCount(_annotationCount);
  }, [annotations, delaunayEstimator]);

  /** Update Estimation of delaunay estimator */
  React.useEffect(() => {
    if (
      practiceConfig.mode !== 'SHAPE' ||
      delaunayEstimator === null ||
      coordEMA === null ||
      annotationCount === 0
    )
      return;

    const _estimatedF = delaunayEstimator.estimate(
      coordEMA.coord,
    );
    const _estimatedSamplingPoints =
      calcSamplingPointsFromFreq(_estimatedF);

    setEstimatedSamplingPoints(_estimatedSamplingPoints);
  }, [
    practiceConfig.mode,
    coordEMA,
    delaunayEstimator,
    annotationCount,
  ]);

  const [goalSamplingPoints, setGoalSamplingPoints] =
    React.useState<NumVector[] | null>(null);

  React.useEffect(() => {
    if (
      practiceConfig.mode !== 'SHAPE' ||
      delaunayEstimator === null ||
      annotationCount === 0
    )
      return;

    const _goalF = delaunayEstimator.estimate(
      practiceConfig.goalInfo.coord,
    );
    const _goalSamplingPoints =
      calcSamplingPointsFromFreq(_goalF);

    setGoalSamplingPoints(_goalSamplingPoints);
  }, [practiceConfig, delaunayEstimator, annotationCount]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.ref__section}>
        <div className={styles.top__section}>
          <p>目標音</p>
          <audio
            src={url(practiceConfig.goalInfo.audioFilePath)}
            controls
            loop
            preload="metadata"
          />
        </div>
        <div className={styles.middle__section}>
          <p>目標図形</p>
          <div className={styles.ref__sketch}>
            <DrawSamplingPointsSketch
              canvasWidth={sketchWidth}
              canvasHeight={sketchWidth}
              samplingPoints={goalSamplingPoints}
            />
          </div>
        </div>
        <div className={styles.bottom__section}></div>
      </div>
      <div className={styles.feedback__section}>
        <div className={styles.top__section}></div>
        <div className={styles.middle__section}>
          <p>現状の図形(赤線)</p>
          <div className={styles.practice__sketch}>
            {isRunning ? (
              <>
                {isSilence && (
                  <p className={styles.silence__text}>
                    No sound detected
                  </p>
                )}
              </>
            ) : (
              <Button
                text={'練習開始'}
                onClick={resumeContext}
              />
            )}

            <DrawPracticeFeedbackSketch
              canvasWidth={sketchWidth}
              canvasHeight={sketchWidth}
              samplingPoints={estimatedSamplingPoints}
              goalSamplingPoints={goalSamplingPoints}
              hidePoints={isSilence}
            />
          </div>
        </div>
        <div className={styles.bottom__section}>
          {isRunning && (
            <Button
              text={'練習終了'}
              onClick={suspendContext}
            />
          )}
        </div>
      </div>
    </div>
  );
};
