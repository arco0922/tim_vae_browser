import { PracticeAudioVisualizerProps } from '@app/components/PracticeAudioVisualizer';
import { latestPracticeGoal } from '@app/constants/practiceConfig';
import {
  latestVisualizerConfig,
  LatestVisualizerWorkletMessage,
} from '@app/constants/visualizerConfig';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './../practice.module.scss';

const PracticeAudioVisualizer = dynamic<
  PracticeAudioVisualizerProps<LatestVisualizerWorkletMessage>
>(
  () =>
    import('@app/components/PracticeAudioVisualizer').then(
      (module) => module.PracticeAudioVisualizer,
    ) as any,
  { ssr: false },
);

const PracticePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>TimToShape-Practice</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      <div className={styles.main__content}>
        <PracticeAudioVisualizer
          practiceConfig={{
            goalInfo: latestPracticeGoal,
            mode: 'SOUND',
          }}
          visualizerConfig={latestVisualizerConfig}
          annotations={{}}
          duration={60 * 10}
        />
      </div>
    </div>
  );
};

export default PracticePage;
