import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Button } from '@app/components/Button';
import {
  Encoder01LongVisualizerConfig,
  Encoder01VisualizerConfig,
  Encoder02LongVisualizerConfig,
  Encoder03LongVisualizerConfig,
  Encoder01NewVisualizerConfig,
} from '@app/constants/visualizerConfig';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './vae.module.scss';

const ShortAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array>
>(
  () =>
    import('../../components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const LongFastAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array[]>
>(
  () =>
    import('../../components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const VAE: NextPage = () => {
  const [mode, setMode] = React.useState<'SHORT' | 'LONG'>(
    'LONG',
  );
  return (
    <div className={styles.container}>
      <h1>VAE demo</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      <div className={styles.button__section}>
        {mode !== 'SHORT' && (
          <Button
            text={'Switch to SHORT VAE'}
            onClick={() => setMode('SHORT')}
          />
        )}
        {mode !== 'LONG' && (
          <Button
            text={'Switch to LONG VAE'}
            onClick={() => setMode('LONG')}
          />
        )}
      </div>
      <div className={styles.main__content}>
        {mode === 'LONG' && (
          <>
            <LongFastAudioVisualizer
              audioFilePath="/audios/beginner.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode={'LATENT'}
              title="beginner"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/intermediate.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode={'LATENT'}
              title="intermediate"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/expert.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode={'LATENT'}
              title="expert1"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/kidokoro.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode={'LATENT'}
              title="expert2"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/kidokoro2.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode={'LATENT'}
              title="expert3"
            />
          </>
        )}
        {mode === 'SHORT' && (
          <>
            <ShortAudioVisualizer
              audioFilePath="/audios/beginner.wav"
              visualizerConfig={Encoder01VisualizerConfig}
              visualizeMode={'LATENT'}
              title="beginner"
            />
            <ShortAudioVisualizer
              audioFilePath="/audios/intermediate.wav"
              visualizerConfig={Encoder01VisualizerConfig}
              visualizeMode={'LATENT'}
              title="intermediate"
            />
            <ShortAudioVisualizer
              audioFilePath="/audios/expert.wav"
              visualizerConfig={Encoder01VisualizerConfig}
              visualizeMode={'LATENT'}
              title="expert1"
            />
            <ShortAudioVisualizer
              audioFilePath="/audios/kidokoro.wav"
              visualizerConfig={Encoder01VisualizerConfig}
              visualizeMode={'LATENT'}
              title="expert2"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VAE;
