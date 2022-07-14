import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';

const SettingTop: NextPage = () => {
  const router = useRouter();
  const [annotations] = useLocalStorage<Annotations>(
    localStorageKeys.EXP_ANNOTATIONS,
    {},
  );
  const [correctEstimationHistory] =
    useLocalStorage<CorrectEstimationHistory>(
      localStorageKeys.EXP_CORRECT_ESTIMATION_HISTORY,
      [],
    );

  const annotationCount =
    Object.entries(annotations).length;
  const hasEndAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  const startAnnotationCallback = React.useCallback(() => {
    router.push('/experiment/settingshape/nextroute');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    window.localStorage.clear();
    router.push('/experiment');
  }, [router]);

  const gotoTestShapeCallback = React.useCallback(() => {
    router.push('/experiment/testshape');
  }, [router]);

  return (
    <div>
      <h1>音色と図形の対応関係の調査</h1>
      {annotationCount === 0 && (
        <>
          <p>
            まず初めに、あなたの音色と図形の対応関係を調査します。
          </p>
          <p>
            これから、いくつかの音に対して、あなたが対応すると感じる図形を回答して頂くタスクを行っていただきます。
          </p>
          <p>
            下の「図形の回答を開始」ボタンを押してください。
          </p>
          <Button
            text={'図形の回答を開始'}
            onClick={startAnnotationCallback}
          />
        </>
      )}
      {annotationCount > 0 && !hasEndAnnotation && (
        <>
          <p>
            実験を途中で中断してしまったようです。大変恐縮ですが、再度始めから実験をやり直してください。
          </p>
          <Button
            text={'始めから実験をやり直す'}
            onClick={resetCallback}
          />
        </>
      )}
      {hasEndAnnotation && (
        <>
          <p>
            あなたの図形と音色の関係の推定が完了しました。
          </p>
          <p>下の「次へ進む」ボタンを押してください。</p>
          <Button
            text={'次へ進む'}
            onClick={gotoTestShapeCallback}
          />
        </>
      )}
    </div>
  );
};

export default SettingTop;
