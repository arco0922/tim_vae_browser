import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { repSoundIds } from '@app/constants/repSounds';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';

const SettingNext: NextPage = () => {
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

  const hasFinishedAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  React.useEffect(() => {
    if (hasFinishedAnnotation) {
      router.push(`/experiment/settingshape`);
      return;
    }
    for (let i = 0; i < repSoundIds.length; i++) {
      if (annotations[repSoundIds[i]] === undefined) {
        router.push(
          `/experiment/settingshape/${repSoundIds[i]}`,
        );
        return;
      }
    }
  }, [annotations, router, hasFinishedAnnotation]);

  return <></>;
};

export default SettingNext;
