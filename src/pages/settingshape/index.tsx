import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { deleteDemoStorages } from '@app/utils/localStorageUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './settingshape.module.scss';

const SettingTop: NextPage = () => {
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

  const annotationCount =
    Object.entries(annotations).length;
  const hasEndAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  const startAnnotationCallback = React.useCallback(() => {
    router.push('/settingshape/nextroute');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    deleteDemoStorages();
  }, []);

  const gotoDemoCallback = React.useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Setting Shapes</h1>
      {annotationCount === 0 && (
        <>
          <p className={styles.guide}>
            It seems you have not set any shapes.
          </p>
          <Button
            text={'図形の設定を開始'}
            onClick={startAnnotationCallback}
            className={styles.confirm__button}
          />
        </>
      )}
      {annotationCount > 0 && !hasEndAnnotation && (
        <>
          <p className={styles.guide}>
            It seems you have set some shapes, but not
            finished the whole setting step.
          </p>
          <Button
            text={'図形の設定を再開'}
            onClick={startAnnotationCallback}
            className={styles.confirm__button}
          />
          <Button
            text={'図形の設定をリセット'}
            onClick={resetCallback}
            className={styles.cancel__button}
          />
        </>
      )}
      {hasEndAnnotation && (
        <>
          <p className={styles.guide}>
            It seems you have finished shape setting.
          </p>
          <Button
            text={'デモを見る'}
            onClick={gotoDemoCallback}
            className={styles.confirm__button}
          />
          <Button
            text={'図形の設定をリセット'}
            onClick={resetCallback}
            className={styles.cancel__button}
          />
        </>
      )}
    </div>
  );
};

export default SettingTop;
