import {
  EncodeResult,
  TimbreVAE,
} from '@app/utils/TimbreVAE';
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import styles from '../styles/VisualizeAudio.module.css';
import dynamic from 'next/dynamic';
import { PlotLatentSketchProps } from '../sketches/PlotLatentSketch';

const PlotLatentSketch = dynamic<PlotLatentSketchProps>(
  () =>
    import('../sketches/PlotLatentSketch').then(
      (module) => module.PlotLatentSketch,
    ) as any,
  { ssr: false },
);

const HIST_LENGTH = 10;
const EMA_ALPHA = 2 / (HIST_LENGTH + 1);

interface Props {
  audioFilePath: string;
  encoderJSONPath: string;
  title?: string;
}

export const VisualizeAudio = ({
  audioFilePath,
  encoderJSONPath,
  title,
}: Props) => {
  const [audioContext, setAudioContext] =
    React.useState<AudioContext | null>(null);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [audioStream, setAudioStream] =
    React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    if (audioContext !== null) return;
    AudioContext =
      window.AudioContext || window.webkitAudioContext;

    const _audioContext = new AudioContext();
    _audioContext.suspend();
    setAudioContext(_audioContext);
  }, [audioContext]);

  React.useEffect(() => {
    if (audioContext === null || audioRef.current === null)
      return;

    const audio = audioRef.current;
    const stream = audio.captureStream
      ? audio.captureStream()
      : audio.mozCaptureStream
      ? audio.mozCaptureStream()
      : null;
    setAudioStream(stream);
  }, [audioContext]);

  const [timbreVAE, setTimbreVAE] =
    React.useState<TimbreVAE | null>(null);

  const [encodeResult, setEncodeResult] =
    React.useState<EncodeResult | null>(null);

  const [encodeResultHist, setEncodeResultHist] =
    React.useState<EncodeResult[]>([]);

  const [coordEMA, setCoordEMA] =
    React.useState<EncodeResult | null>(null);

  React.useEffect(() => {
    if (
      audioContext === null ||
      audioStream === null ||
      timbreVAE !== null
    )
      return;
    const setupProcessing = async () => {
      const encoder = await tf.loadGraphModel(
        encoderJSONPath,
      );
      const _timbreVAE = new TimbreVAE(
        audioContext,
        audioStream,
        encoder,
        setEncodeResult,
      );
      setTimbreVAE(timbreVAE);
      await _timbreVAE.start();
    };
    setupProcessing();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timbreVAE, audioContext, audioStream]);

  React.useEffect(() => {
    if (encodeResult === null) return;
    const tmp = [...encodeResultHist, encodeResult];
    const newHist =
      tmp.length <= HIST_LENGTH ? tmp : tmp.slice(1);
    setEncodeResultHist(newHist);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodeResult]);

  React.useEffect(() => {
    const histLen = encodeResultHist.length;
    if (histLen === 0) return;
    const lastResult = encodeResultHist[histLen - 1];

    if (coordEMA === null || histLen < HIST_LENGTH) {
      const avgCoord = [];
      for (let i = 0; i < lastResult.coord.length; i++) {
        let s = 0;
        for (let j = 0; j < histLen; j++) {
          s += encodeResultHist[j].coord[i];
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

  const resumeContext = React.useCallback(() => {
    if (audioContext === null) return;
    audioContext.resume();
  }, [audioContext]);

  const stopContext = React.useCallback(() => {
    if (audioContext === null) return;
    audioContext.suspend();
  }, [audioContext]);

  return (
    <div className={styles.container}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <audio
        src={audioFilePath}
        controls
        loop
        ref={audioRef}
        onPlay={resumeContext}
        onPause={stopContext}
      />
      <p>first: {coordEMA?.coord[0]}</p>
      <p>second: {coordEMA?.coord[1]}</p>
      <PlotLatentSketch
        canvasWidth={500}
        canvasHeight={500}
        encodeResult={coordEMA}
        className={styles.sketch__container}
      />
    </div>
  );
};
