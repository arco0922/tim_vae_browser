import {
  Annotations,
  NumVector,
  ShapeParams,
} from '@app/@types';
import {
  StepOneRepSoundId,
  stepOneRepSoundIds,
} from '@app/constants/repSounds';
import {
  SampleShapeId,
  sampleShapes,
} from '@app/constants/sampleShapes';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import {
  calcFreqFromParams,
  calcSamplingPointsFromFreq,
} from '@app/utils/shapeUtils';
import { url } from '@app/utils/urlConfig';
import React from 'react';
import { Button } from '../Button';
import { SampleShapeSelector } from './SampleShapeSelector';
import { ShapeEditor } from './ShapeEditor';
import styles from './StepOneAnnotator.module.scss';

export interface StepOneAnnotatorProps {
  annotations: Annotations;
  setAnnotations: (annotations: Annotations) => void;
  goNextCallback: () => void;
}

type SamplingPointsCollection = {
  [rsId in StepOneRepSoundId]?: NumVector[];
};

const sketchWidth = 150;

export const StepOneAnnotator = ({
  annotations,
  setAnnotations,
  goNextCallback,
}: StepOneAnnotatorProps) => {
  const addAnnotation = React.useCallback(
    (
      repSoundId: StepOneRepSoundId,
      annotaitonVector: NumVector,
    ) => {
      const newAnnotations = {
        ...annotations,
        [repSoundId]: annotaitonVector,
      };
      setAnnotations(newAnnotations);
    },
    [annotations, setAnnotations],
  );

  const [
    samplingPointsCollection,
    setSamplingPointsCollection,
  ] = React.useState<SamplingPointsCollection>({});

  React.useEffect(() => {
    const _samplingPointsCollection =
      {} as SamplingPointsCollection;
    stepOneRepSoundIds.forEach((rsId) => {
      const freq = annotations[rsId];
      if (freq === undefined) return;
      const samplingPoints =
        calcSamplingPointsFromFreq(freq);
      _samplingPointsCollection[rsId] = samplingPoints;
    });
    setSamplingPointsCollection(_samplingPointsCollection);
  }, [annotations]);

  const [hasPlayedOnceSet, setHasPlayedOnceSet] =
    React.useState<Set<StepOneRepSoundId>>(new Set());

  const playSound = (rsId: StepOneRepSoundId) => {
    const audioElem = document.querySelector(
      `#audio__${rsId}`,
    );
    if (audioElem === null) return;
    const audio = audioElem as HTMLAudioElement;
    if (!audio.paused) return;
    audio.play();
  };

  const pauseSound = (rsId: StepOneRepSoundId) => {
    const audioElem = document.querySelector(
      `#audio__${rsId}`,
    );
    if (audioElem === null) return;
    const audio = audioElem as HTMLAudioElement;
    if (audio.paused) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const pauseOtherSounds = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      stepOneRepSoundIds.forEach((_rsId) => {
        if (_rsId === rsId) return;
        pauseSound(_rsId);
      });
    },
    [],
  );

  const playCallback = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      setHasPlayedOnceSet(
        (prevSet) => new Set(prevSet.add(rsId)),
      );
      pauseOtherSounds(rsId);
    },
    [pauseOtherSounds],
  );

  const [selectingId, setSelectingId] =
    React.useState<StepOneRepSoundId | null>(null);

  const [editingId, setEditingId] =
    React.useState<StepOneRepSoundId | null>(null);

  const startAnnotateCallback = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      pauseOtherSounds(rsId);
      playSound(rsId);
      setSelectingId(rsId);
    },
    [pauseOtherSounds],
  );

  const [selectedShapeIds, setSelectedShapeIds] =
    React.useState<{
      [rsId in StepOneRepSoundId]?: SampleShapeId;
    }>({});

  const selectConfirmCallback = React.useCallback(
    (
      rsId: StepOneRepSoundId | null,
      shapeId: SampleShapeId,
    ) => {
      if (rsId === null) return;
      const _selectedShapeIds = {
        ...selectedShapeIds,
        [rsId]: shapeId,
      };
      setSelectedShapeIds(_selectedShapeIds);
      setSelectingId(null);
      setEditingId(rsId);
    },
    [selectedShapeIds],
  );

  const selectCancelCallback = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      pauseSound(rsId);
      setSelectingId(null);
    },
    [],
  );

  const editConfirmCallback = React.useCallback(
    (rsId: StepOneRepSoundId, shapeParams: ShapeParams) => {
      const freq = calcFreqFromParams(shapeParams);
      addAnnotation(rsId, freq);
      setEditingId(null);
    },
    [addAnnotation],
  );

  const editCancelCallback = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      setEditingId(null);
      setSelectingId(rsId);
    },
    [],
  );

  const annotateAgainCallback = React.useCallback(
    (rsId: StepOneRepSoundId) => {
      startAnnotateCallback(rsId);
    },
    [startAnnotateCallback],
  );

  return (
    <div className={styles.container}>
      <div className={styles.guide__section}>
        <h2 className={styles.title}>ステップ1-1 ~ 1-3</h2>
        <p>
          左側の{stepOneRepSoundIds.length}
          個の音各々に対して、右側の図形の一覧から対応すると感じるものを回答して下さい。
        </p>
        <p>
          ただし、
          <span className={styles.caution}>
            全ての音を一度以上再生しないと図形を回答できるようになりません。
          </span>
          <br />
          それぞれの音を良く聴き比べてから回答してください。
        </p>
        <p>
          全ての音に対して図形を回答し終えたら、ページ一番下の「次へ」ボタンを押してください。
        </p>
      </div>
      <div className={styles.annotate__section}>
        <div className={styles.annotator__section}>
          {stepOneRepSoundIds.map((rsId) => (
            <div
              key={rsId}
              className={styles.item__container}
            >
              <audio
                src={url(`/audios/repSounds/${rsId}.wav`)}
                controls
                loop
                onPlay={() => playCallback(rsId)}
                className={styles.audio}
                id={`audio__${rsId}`}
              />
              {selectingId !== rsId &&
                editingId !== rsId &&
                samplingPointsCollection[rsId] ===
                  undefined && (
                  <Button
                    text={'この音に対する図形の回答を開始'}
                    onClick={() =>
                      startAnnotateCallback(rsId)
                    }
                    className={styles.button}
                    disabled={
                      hasPlayedOnceSet.size !==
                        stepOneRepSoundIds.length ||
                      selectingId !== null ||
                      editingId !== null
                    }
                  />
                )}
              {selectingId === rsId && (
                <>
                  <p className={styles.guide}>
                    右の図形の一覧の中から、この音に最も対応していると感じる図形を一つ選んでクリックしてください。
                  </p>
                  <Button
                    text={'図形の選択をキャンセル'}
                    onClick={() =>
                      selectCancelCallback(rsId)
                    }
                    className={`${styles.cancel__button} ${styles.button}`}
                  />
                </>
              )}
              {editingId === rsId && (
                <>
                  <p className={styles.guide}>
                    パラメータを微調節し、自分にとって最もこの音に対応すると感じるように図形を変形させてください。
                    <br />
                    既に対応していると感じる場合はそのままでも構いません。
                  </p>
                  <ShapeEditor
                    defaultShapeParams={
                      sampleShapes[
                        selectedShapeIds[rsId] || 'ss00'
                      ]
                    }
                    confirmCallback={(shapeParams) =>
                      editConfirmCallback(rsId, shapeParams)
                    }
                    cancelCallback={() =>
                      editCancelCallback(rsId)
                    }
                  />
                </>
              )}
              {samplingPointsCollection[rsId] !==
                undefined &&
                selectingId !== rsId &&
                editingId !== rsId && (
                  <>
                    <p className={styles.guide}>
                      あなたがこの音に対応すると回答した図形は以下の通りです。
                    </p>
                    <DrawSamplingPointsSketch
                      canvasWidth={sketchWidth}
                      canvasHeight={sketchWidth}
                      samplingPoints={
                        samplingPointsCollection[rsId] ||
                        null
                      }
                    />
                    <Button
                      text={
                        'この音に対する図形の回答をやり直す'
                      }
                      onClick={() =>
                        annotateAgainCallback(rsId)
                      }
                      className={`${styles.cancel__button} ${styles.button}`}
                      disabled={
                        hasPlayedOnceSet.size !==
                          stepOneRepSoundIds.length ||
                        selectingId !== null ||
                        editingId !== null
                      }
                    />
                  </>
                )}
            </div>
          ))}
        </div>
        <div className={styles.select__section}>
          <SampleShapeSelector
            selectCallback={(shapeId) =>
              selectConfirmCallback(selectingId, shapeId)
            }
            disabled={selectingId === null}
          />
        </div>
      </div>
      <div className={styles.navigation__section}>
        <Button
          text={'次へ'}
          onClick={goNextCallback}
          disabled={
            Object.keys(samplingPointsCollection).length !==
            stepOneRepSoundIds.length
          }
          className={styles.next__button}
        />
      </div>
    </div>
  );
};
