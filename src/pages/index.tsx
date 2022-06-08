import { VisualizeAudioProps } from '@app/components/VisualizeAudio';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styles from '../styles/Top.module.css';

const VisualizeAudio = dynamic<VisualizeAudioProps>(
  () =>
    import('../components/VisualizeAudio').then(
      (module) => module.VisualizeAudio,
    ) as any,
  { ssr: false },
);

const Top: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Timbre-VAE on browser</h1>
      <div className={styles.main__content}>
        <VisualizeAudio
          audioFilePath="/audios/beginner.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="beginner"
        />
        <VisualizeAudio
          audioFilePath="/audios/intermediate.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="intermediate"
        />
        <VisualizeAudio
          audioFilePath="/audios/expert.wav"
          encoderJSONPath="/models/encoder01/model.json"
          title="expert"
        />
      </div>
    </div>
  );
};

export default Top;
