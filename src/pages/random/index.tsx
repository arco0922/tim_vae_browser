import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import {
  Encoder01LongVisualizerConfig,
  Encoder01VisualizerConfig,
  Encoder02LongVisualizerConfig,
  Encoder03LongVisualizerConfig,
} from '@app/constants/visualizerConfig';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './random.module.scss';

const LongFastAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array[]>
>(
  () =>
    import('@app/components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const Random: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Random Shape demo</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      <div className={styles.main__content}>
        <LongFastAudioVisualizer
          audioFilePath="/audios/expert.wav"
          visualizerConfig={Encoder02LongVisualizerConfig}
          visualizeMode={'RANDOM'}
          title="sample"
        />
      </div>
    </div>
  );
};

export default Random;
