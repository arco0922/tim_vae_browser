import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { ExpErrorComponent } from '@app/components/ExpErrorComponent';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './settinshape.module.scss';

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

  const gotoTestShapeCallback = React.useCallback(() => {
    router.push('/experiment/testshape');
  }, [router]);

  if (annotationCount > 0 && !hasEndAnnotation) {
    return <ExpErrorComponent />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        ステップ1{hasEndAnnotation && ` 終了`}
      </h2>
      {annotationCount === 0 && (
        <>
          <div className={styles.guide}>
            <p>
              まず初めに、あなたの音色と図形の対応関係の推定を行います。
            </p>
            <p>下の「次へ」ボタンを押してください。</p>
          </div>
          <Button
            text={'次へ'}
            onClick={startAnnotationCallback}
          />
        </>
      )}
      {hasEndAnnotation && (
        <>
          <div className={styles.guide}>
            <p>
              あなたの図形と音色の関係の推定が完了しました。
            </p>
            <p>下の「次へ進む」ボタンを押してください。</p>
          </div>
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
