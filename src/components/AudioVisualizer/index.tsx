import {
  EncodeResult,
  TimbreVAE,
} from '@app/utils/TimbreVAE';
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import styles from './AudioVisualizer.module.scss';
import dynamic from 'next/dynamic';
import { PlotLatentSketchProps } from '../../sketches/PlotLatentSketch';
import { url } from '@app/utils/urlConfig';
import {
  VisualizeMode,
  VisualizerConfig,
  WorkletMessage,
} from '@app/constants/visualizerConfig';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import {
  Annotations,
  NumVector,
  RepSoundId,
} from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import { repSoundCoords } from '@app/constants/repSounds';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import { DrawSamplingPointsSketchProps } from '@app/sketches/DrawSamplingPointsSketch';

const PlotLatentSketch = dynamic<PlotLatentSketchProps>(
  () =>
    import('../../sketches/PlotLatentSketch').then(
      (module) => module.PlotLatentSketch,
    ) as any,
  { ssr: false },
);

const DrawSamplingPointsSketch =
  dynamic<DrawSamplingPointsSketchProps>(
    () =>
      import(
        '../../sketches/DrawSamplingPointsSketch'
      ).then(
        (module) => module.DrawSamplingPointsSketch,
      ) as any,
    { ssr: false },
  );

const HIST_LENGTH = 20;
const EMA_ALPHA = 2 / (HIST_LENGTH + 1);

const sketchWidth = 500;

export interface AudioVisualizerProps<
  P extends WorkletMessage,
> {
  audioFilePath: string;
  visualizerConfig: VisualizerConfig<P>;
  visualizeMode: VisualizeMode;
  annotations: Annotations;
  title?: string;
}

export const AudioVisualizer = <P extends WorkletMessage>({
  audioFilePath,
  visualizerConfig,
  visualizeMode,
  annotations,
  title,
}: AudioVisualizerProps<P>) => {
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

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [audioSource, setAudioSource] =
    React.useState<MediaElementAudioSourceNode | null>(
      null,
    );

  /**
   * Setup Audio Source
   */
  React.useEffect(() => {
    if (
      audioContext === null ||
      audioRef.current === null ||
      audioSource !== null
    )
      return;
    const audio = audioRef.current;
    const _source =
      audioContext.createMediaElementSource(audio);
    setAudioSource(_source);

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

    audioSource
      .connect(resampleProcessor)
      .connect(audioContext.destination);
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

  /**
   * Setup Connection between TimbreVAE and AudioGraph
   */
  React.useEffect(() => {
    if (resampleProcessor === null || timbreVAE === null)
      return;
    resampleProcessor.port.onmessage = async (e: {
      data: P | null;
    }) => {
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

  /**
   * AudioContext must be resumed manually by user
   */
  const resumeContext = React.useCallback(() => {
    if (
      audioContext === null ||
      audioContext.state === 'running'
    )
      return;
    audioContext.resume();
  }, [audioContext]);

  const suspendContext = React.useCallback(() => {
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
    if (visualizeMode === 'LATENT') return;
    const _delaunayEstimator = new DelaunayEstimator(
      delaunayConfig.inputDim,
      delaunayConfig.outputDim,
    );
    setDelaunayEstimator(_delaunayEstimator);
  }, [visualizeMode]);

  React.useEffect(() => {
    if (delaunayEstimator === null) return;
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
  }, [coordEMA, delaunayEstimator, annotationCount]);

  return (
    <div className={styles.container}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <audio
        src={url(audioFilePath)}
        controls
        loop
        ref={audioRef}
        onClick={resumeContext}
        onPlay={resumeContext}
        onPause={suspendContext}
      />
      {visualizeMode === 'LATENT' && (
        <>
          <p>first: {coordEMA?.coord[0]}</p>
          <p>second: {coordEMA?.coord[1]}</p>
          <PlotLatentSketch
            canvasWidth={sketchWidth}
            canvasHeight={sketchWidth}
            encodeResult={coordEMA}
            latentImgInfo={visualizerConfig.latentImgInfo}
            className={styles.sketch__container}
          />
        </>
      )}
      {visualizeMode === 'SHAPE' && (
        <>
          <DrawSamplingPointsSketch
            canvasWidth={sketchWidth}
            canvasHeight={sketchWidth}
            samplingPoints={estimatedSamplingPoints}
          />
        </>
      )}
    </div>
  );
};
