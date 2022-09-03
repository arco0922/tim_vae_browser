import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { RelationVisualizerProps } from '@app/components/RelationVisualizer';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { Encoder01NewVisualizerConfig } from '@app/constants/visualizerConfig';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './relation.module.scss';

const RelationVisualizer = dynamic<
  RelationVisualizerProps<Float32Array[]>
>(
  () =>
    import('@app/components/RelationVisualizer').then(
      (module) => module.RelationVisualizer,
    ) as any,
  { ssr: false },
);

const RelationPage: NextPage = () => {
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

  const router = useRouter();
  const gotoSettingCallback = React.useCallback(() => {
    router.push('/settingshape');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>Relation Visualizer</h1>
      {hasFinishedAnnotation ? (
        <RelationVisualizer
          annotations={annotations}
          visualizerConfig={Encoder01NewVisualizerConfig}
          className={styles.relation__visualizer}
        />
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

export default RelationPage;
