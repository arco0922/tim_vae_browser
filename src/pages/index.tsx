import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import {
  Encoder01LongVisualizerConfig,
  Encoder01VisualizerConfig,
  Encoder02LongVisualizerConfig,
  Encoder03LongVisualizerConfig,
} from '@app/constants/visualizerConfig';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styles from './TopPage.module.scss';

const LongFastAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array[]>
>(
  () =>
    import('../components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const Top: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Timbre-VAE on browser</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      <div className={styles.main__content}>
        <LongFastAudioVisualizer
          audioFilePath="/audios/beginner.wav"
          visualizerConfig={Encoder02LongVisualizerConfig}
          visualizeMode="SHAPE"
          title="beginner"
        />
        <LongFastAudioVisualizer
          audioFilePath="/audios/intermediate.wav"
          visualizerConfig={Encoder02LongVisualizerConfig}
          visualizeMode="SHAPE"
          title="intermediate"
        />
        <LongFastAudioVisualizer
          audioFilePath="/audios/expert.wav"
          visualizerConfig={Encoder02LongVisualizerConfig}
          visualizeMode="SHAPE"
          title="expert"
        />
      </div>
    </div>
  );
};

export default Top;
