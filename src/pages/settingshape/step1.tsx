import { NextPage } from 'next';
import React from 'react';
import styles from './step1.module.scss';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import useLocalStorage from 'use-local-storage';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { ExpErrorComponent } from '@app/components/ExpErrorComponent';
import { StepOneAnnotatorProps } from '@app/components/Annotator/StepOneAnnotator';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';

const StepOneAnnotator = dynamic<StepOneAnnotatorProps>(
  () =>
    import(
      '@app/components/Annotator/StepOneAnnotator'
    ).then((module) => module.StepOneAnnotator) as any,
  { ssr: false },
);

const SettingId: NextPage = () => {
  const router = useRouter();

  const [annotations, setAnnotations] =
    useLocalStorage<Annotations>(
      localStorageKeys.ANNOTATIONS,
      {},
    );

  const goNextCallback = React.useCallback(() => {
    router.push('/settingshape/nextroute');
  }, [router]);

  return (
    <div className={styles.container}>
      <StepOneAnnotator
        encoderId={'encoder01_new'}
        annotations={annotations}
        setAnnotations={setAnnotations}
        goNextCallback={goNextCallback}
      />
    </div>
  );
};

export default SettingId;
