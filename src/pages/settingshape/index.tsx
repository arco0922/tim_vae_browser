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
  const [annotations, setAnnotations] =
    useLocalStorage<Annotations>(
      localStorageKeys.ANNOTATIONS,
      {},
    );
  const [
    correctEstimationHistory,
    setCorrectEstimationHistory,
  ] = useLocalStorage<CorrectEstimationHistory>(
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
    setAnnotations({});
    setCorrectEstimationHistory([]);
  }, [setAnnotations, setCorrectEstimationHistory]);

  const gotoDemoCallback = React.useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div>
      <h1>Setting Shapes</h1>
      {annotationCount === 0 && (
        <>
          <p>It seems you have not set any shapes.</p>
          <Button
            text={'図形の設定を開始'}
            onClick={startAnnotationCallback}
          />
        </>
      )}
      {annotationCount > 0 && !hasEndAnnotation && (
        <>
          <p>
            It seems you have set some shapes, but not
            finished the whole setting step.
          </p>
          <Button
            text={'図形の設定を再開'}
            onClick={startAnnotationCallback}
          />
          <Button
            text={'図形の設定をリセット'}
            onClick={resetCallback}
          />
        </>
      )}
      {hasEndAnnotation && (
        <>
          <p>It seems you have finished shape setting.</p>
          <Button
            text={'デモを見る'}
            onClick={gotoDemoCallback}
          />
          <Button
            text={'図形の設定をリセット'}
            onClick={resetCallback}
          />
        </>
      )}
    </div>
  );
};

export default SettingTop;
