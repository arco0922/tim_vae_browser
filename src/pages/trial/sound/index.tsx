import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { PracticeAudioVisualizerProps } from '@app/components/PracticeAudioVisualizer';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { latestPracticeGoal } from '@app/constants/practiceConfig';
import {
  latestVisualizerConfig,
  LatestVisualizerWorkletMessage,
} from '@app/constants/visualizerConfig';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './../trial.module.scss';

const PracticeAudioVisualizer = dynamic<
  PracticeAudioVisualizerProps<LatestVisualizerWorkletMessage>
>(
  () =>
    import('@app/components/PracticeAudioVisualizer').then(
      (module) => module.PracticeAudioVisualizer,
    ) as any,
  { ssr: false },
);

const TrialPage: NextPage = () => {
  const router = useRouter();

  const [annotations] = useLocalStorage<Annotations>(
    localStorageKeys.ANNOTATIONS,
    {},
  );

  const [correctEstimationHistory] =
    useLocalStorage<CorrectEstimationHistory>(
      localStorageKeys.CORRECT_ESTIMATION_HISTORY,
      [],
    );

  const hasFinishedAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  const gotoSettingCallback = React.useCallback(() => {
    router.push('/settingshape');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>TimMorph-Trial</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      {hasFinishedAnnotation ? (
        <div className={styles.main__content}>
          <PracticeAudioVisualizer
            practiceConfig={{
              goalInfo: latestPracticeGoal,
              mode: 'SOUND',
            }}
            visualizerConfig={latestVisualizerConfig}
            annotations={annotations}
            isTrial={true}
            duration={60 * 1}
            downloadFileName={'trial_sound.webm'}
          />
        </div>
      ) : (
        <>
          <p>
            It seems you have not finished shape setting.
          </p>
          <Button
            text={'図形を設定する'}
            onClick={gotoSettingCallback}
          />
        </>
      )}
    </div>
  );
};

export default TrialPage;
