import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
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
      <div className={styles.main__content}>
        <AudioVisualizer
          audioFilePath="/audios/beginner.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="beginner"
        />
        <AudioVisualizer
          audioFilePath="/audios/intermediate.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="intermediate"
        />
        <AudioVisualizer
          audioFilePath="/audios/expert.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="expert"
        />
      </div>
    </div>
  );
};

export default Top;
