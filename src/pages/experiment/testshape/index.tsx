import {
  CorrectEstimationHistory,
  ExpResults,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
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

  const resetCallback = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment');
  }, [router]);

  if (!hasFinishedAnnotation) {
    return (
      <div>
        <p>
          実験を途中で中断してしまったようです。大変恐縮ですが、再度始めから実験をやり直してください。
        </p>
        <Button
          text={'始めから実験をやり直す'}
          onClick={resetCallback}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ステップ2</h2>
      <div className={styles.guide}>
        引き続き、あなたの音色と図形の対応関係を確認します。
        <br />
        下の「次へ進む」ボタンを押してください。
      </div>
      <Button
        text={'次へ進む'}
        onClick={gotoTestCallback}
      />
    </div>
  );
};

export default TestTop;
