import { NextPage } from 'next';
import React from 'react';
import styles from './settingshape[repSoundId].module.scss';
import dynamic from 'next/dynamic';
import { AnnotatorProps } from '@app/components/Annotator';
import { useRouter } from 'next/router';
import {
  RepSoundId,
  repSoundIds,
} from '@app/constants/repSounds';
import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import useLocalStorage from 'use-local-storage';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
import { ExpErrorComponent } from '@app/components/ExpErrorComponent';

const Annotator = dynamic<AnnotatorProps>(
  () =>
    import('@app/components/Annotator/ExpAnnotator').then(
      (module) => module.ExpAnnotator,
    ) as any,
  { ssr: false },
);

const _repSoundIds = repSoundIds.map(
  (rsId) => rsId as string,
);

const SettingId: NextPage = () => {
  const router = useRouter();
  const { repSoundId } = router.query;

  const [annotations, setAnnotations] =
    useLocalStorage<Annotations>(
      localStorageKeys.EXP_ANNOTATIONS,
      {},
    );

  const [
    correctEstimationHistory,
    setCorrectEstimationHistory,
  ] = useLocalStorage<CorrectEstimationHistory>(
    localStorageKeys.EXP_CORRECT_ESTIMATION_HISTORY,
    [],
  );

  const goNextCallback = React.useCallback(() => {
    router.push('/experiment/settingshape/nextroute');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment/settingshape');
  }, [router]);

  if (
    repSoundId === undefined ||
    typeof repSoundId === 'object' ||
    !_repSoundIds.includes(repSoundId)
  ) {
    return <ExpErrorComponent />;
  }

  return (
    <div className={styles.container}>
      <Annotator
        encoderId={'encoder02_long'}
        repSoundId={repSoundId as RepSoundId}
        annotations={annotations}
        setAnnotations={setAnnotations}
        correctEstimationHistory={correctEstimationHistory}
        setCorrectEstimationHistory={
          setCorrectEstimationHistory
        }
        goNextCallback={goNextCallback}
        resetCallback={resetCallback}
      />
    </div>
  );
};

export default SettingId;
