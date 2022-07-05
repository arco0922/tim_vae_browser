import { Annotations } from '@app/@types';
import { repSoundIds } from '@app/constants/repSounds';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';

const SettingTop: NextPage = () => {
  const router = useRouter();
  const [annotations, setAnnotations] =
    useLocalStorage<Annotations>('annotations', {});

  React.useEffect(() => {
    for (let i = 0; i < repSoundIds.length; i++) {
      if (annotations[repSoundIds[i]] === undefined) {
        router.push(`/settingshape/${repSoundIds[i]}`);
        return;
      }
    }
  }, [annotations, router]);

  return <></>;
};

export default SettingTop;
