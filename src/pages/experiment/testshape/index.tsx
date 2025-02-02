import {
  CorrectEstimationHistory,
  ExpResults,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { ExpErrorComponent } from '@app/components/ExpErrorComponent';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './testshape.module.scss';

const TestTop: NextPage = () => {
  const router = useRouter();

  const [correctEstimationHistory] =
    useLocalStorage<CorrectEstimationHistory>(
      localStorageKeys.EXP_CORRECT_ESTIMATION_HISTORY,
      [],
    );

  const hasFinishedAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  const [expResults, setExpResults] =
    useLocalStorage<ExpResults>(
      localStorageKeys.EXP_RESULTS,
      {},
    );

  const gotoTestCallback = React.useCallback(() => {
    router.push('/experiment/testshape/1');
    setExpResults({});
  }, [router, setExpResults]);

  if (!hasFinishedAnnotation) {
    return <ExpErrorComponent />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ステップ2</h2>
      <div className={styles.guide}>
        続いて、あなたの音色と図形の対応関係に関してより詳細な調査を行います。
        <br />
        下の「次へ」ボタンを押してください。
      </div>
      <Button
        text={'次へ'}
        onClick={gotoTestCallback}
        className={styles.next__button}
      />
    </div>
  );
};

export default TestTop;
