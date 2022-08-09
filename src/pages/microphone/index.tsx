import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import {
  Encoder01LongVisualizerConfig,
  Encoder01VisualizerConfig,
  Encoder02LongVisualizerConfig,
  Encoder03LongVisualizerConfig,
} from '@app/constants/visualizerConfig';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './microphone.module.scss';

const LongFastAudioVisualizer = dynamic<
  AudioVisualizerProps<Float32Array[]>
>(
  () =>
    import('@app/components/AudioVisualizer').then(
      (module) => module.AudioVisualizer,
    ) as any,
  { ssr: false },
);

const Top: NextPage = () => {
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

  const hasFinishedAnnotation = judgeHasEndAnnotation(
    correctEstimationHistory,
  );

  const gotoDemoCallback = React.useCallback(() => {
    router.push('/');
  }, [router]);

  const gotoSettingCallback = React.useCallback(() => {
    router.push('/settingshape');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>TimMorph - Microphone Demo</h1>
      <h3 className={styles.caution}>
        Please allow microphone usage in this page. <br />
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      {hasFinishedAnnotation ? (
        <>
          <div className={styles.button__section}>
            <Button
              text={'音声ファイルでのデモを見る'}
              onClick={gotoDemoCallback}
            />
            <Button
              text={'図形を設定を変更する'}
              onClick={gotoSettingCallback}
            />
          </div>

          <div className={styles.main__content}>
            <LongFastAudioVisualizer
              useMicrophone={true}
              visualizerConfig={
                Encoder02LongVisualizerConfig
              }
              visualizeMode={'SHAPE'}
              annotations={annotations}
            />
          </div>
        </>
      ) : (
        <>
          <p>
            It seems you have not finished shape setting.
          </p>
          <Button
            text={'図形を設定する'}
            onClick={gotoSettingCallback}
          />
        </>
      )}
    </div>
  );
};

export default Top;
