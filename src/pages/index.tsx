import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Encoder01_LATENT_INFO } from '@app/constants/basic';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styles from '../styles/Top.module.css';

const AudioVisualizer = dynamic<AudioVisualizerProps>(
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
        Only Chrome, Firefox, and Edge are supported. Other
        browsers are not recommended.
      </h3>
      <div className={styles.main__content}>
        <AudioVisualizer
          audioFilePath="/audios/beginner.wav"
          encoderJSONPath="/models/encoder01/model.json"
          latentImgInfo={Encoder01_LATENT_INFO}
          title="beginner"
        />
        <AudioVisualizer
          audioFilePath="/audios/intermediate.wav"
          encoderJSONPath="/models/encoder01/model.json"
          latentImgInfo={Encoder01_LATENT_INFO}
          title="intermediate"
        />
        <AudioVisualizer
          audioFilePath="/audios/expert.wav"
          encoderJSONPath="/models/encoder01/model.json"
          latentImgInfo={Encoder01_LATENT_INFO}
          title="expert"
        />
      </div>
    </div>
  );
};

export default Top;
