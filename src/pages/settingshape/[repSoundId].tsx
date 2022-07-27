import { NextPage } from 'next';
import React from 'react';
import styles from './settingshape.module.scss';
import dynamic from 'next/dynamic';
import { AnnotatorProps } from '../../components/Annotator';
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
import { deleteDemoStorages } from '@app/utils/localStorageUtils';

const Annotator = dynamic<AnnotatorProps>(
  () =>
    import('../../components/Annotator').then(
      (module) => module.Annotator,
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

  const goNextCallback = React.useCallback(() => {
    router.push('/settingshape/nextroute');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    deleteDemoStorages();
    router.push('/settingshape');
  }, [router]);

  if (
    repSoundId === undefined ||
    typeof repSoundId === 'object' ||
    !_repSoundIds.includes(repSoundId)
  ) {
    return <div>No representative sound was Found</div>;
  }

  return (
    <div className={styles.container}>
      <Annotator
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
