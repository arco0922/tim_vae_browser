import { CorrectEstimationHistory } from '@app/@types';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';

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

  const gotoTestCallback = React.useCallback(() => {
    router.push('/experiment/testshape/nextroute');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    window.localStorage.clear();
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
    <div>
      <h1>音色と図形の対応関係の確認</h1>
      <p>
        今度は、あなたの音色と図形の対応関係の推定の精度の確認を行います。
      </p>
      <p>下の「次へ進む」ボタンを押してください。</p>
      <Button
        text={'次へ進む'}
        onClick={gotoTestCallback}
      />
    </div>
  );
};

export default TestTop;
