import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { AudioVisualizerProps } from '@app/components/AudioVisualizer';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import {
  Encoder01LongVisualizerConfig,
  Encoder01NewVisualizerConfig,
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
import styles from './TopPage.module.scss';

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

  const gotoSettingCallback = React.useCallback(() => {
    router.push('/settingshape');
  }, [router]);

  const gotoMicCallback = React.useCallback(() => {
    router.push('/microphone');
  }, [router]);

  return (
    <div className={styles.container}>
      <h1>TimMorph</h1>
      <h3 className={styles.caution}>
        Only Chrome is supported. Other browsers are not
        recommended.
      </h3>
      {hasFinishedAnnotation ? (
        <>
          <div className={styles.button__section}>
            <Button
              text={'マイクを使って体験する'}
              onClick={gotoMicCallback}
              className={styles.confirm__button}
            />
            <Button
              text={'図形を設定を変更する'}
              onClick={gotoSettingCallback}
            />
          </div>

          <div className={styles.main__content}>
            <LongFastAudioVisualizer
              audioFilePath="/audios/beginner.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode="SHAPE"
              annotations={annotations}
              title="beginner"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/intermediate.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode="SHAPE"
              annotations={annotations}
              title="intermediate"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/expert.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode="SHAPE"
              annotations={annotations}
              title="expert1"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/kidokoro.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode="SHAPE"
              annotations={annotations}
              title="expert2"
            />
            <LongFastAudioVisualizer
              audioFilePath="/audios/kidokoro2.wav"
              visualizerConfig={
                Encoder01NewVisualizerConfig
              }
              visualizeMode="SHAPE"
              annotations={annotations}
              title="expert3"
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
