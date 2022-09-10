import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import {
  latestVisualizerConfig,
  LatestVisualizerWorkletMessage,
} from '@app/constants/visualizerConfig';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './vae.module.scss';

const AudioVisualizer = dynamic<
  AudioVisualizerProps<LatestVisualizerWorkletMessage>
>(
  () =>
    import('@app/components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const VAE: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>VAE demo</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      <div className={styles.main__content}>
        <AudioVisualizer
          audioFilePath="/audios/beginner.wav"
          visualizerConfig={latestVisualizerConfig}
          visualizeMode={'LATENT'}
          title="beginner"
        />
        <AudioVisualizer
          audioFilePath="/audios/intermediate.wav"
          visualizerConfig={latestVisualizerConfig}
          visualizeMode={'LATENT'}
          title="intermediate"
        />
        <AudioVisualizer
          audioFilePath="/audios/expert.wav"
          visualizerConfig={latestVisualizerConfig}
          visualizeMode={'LATENT'}
          title="expert1"
        />
        <AudioVisualizer
          audioFilePath="/audios/kidokoro.wav"
          visualizerConfig={latestVisualizerConfig}
          visualizeMode={'LATENT'}
          title="expert2"
        />
        <AudioVisualizer
          audioFilePath="/audios/kidokoro2.wav"
          visualizerConfig={latestVisualizerConfig}
          visualizeMode={'LATENT'}
          title="expert3"
        />
      </div>
    </div>
  );
};

export default VAE;
