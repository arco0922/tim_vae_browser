import {
  Annotations,
  CorrectEstimationFlg,
  CorrectEstimationHistory,
  NumVector,
  ShapeParams,
} from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import {
  repSoundCoords,
  RepSoundId,
} from '@app/constants/repSounds';
import {
  SampleShapeId,
  sampleShapes,
} from '@app/constants/sampleShapes';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import {
  DelaunayEstimator,
  SuggestionVectorsInfo,
} from '@app/utils/DelaunayEstimator';
import {
  calcFreqFromParams,
  calcSamplingPointsFromFreq,
} from '@app/utils/shapeUtils';
import { url } from '@app/utils/urlConfig';
import React from 'react';
import { Button } from '../Button';
import { SampleShapeSelector } from './SampleShapeSelector';
import { ShapeEditor } from './ShapeEditor';
import styles from './Annotator.module.scss';
import { CorrectEstimationJudger } from './CorrectEstimationJudger';
import { ShapeSearcher } from './ShapeSearcher';

const sketchWidth = 150;

export interface AnnotatorProps {
  repSoundId: RepSoundId;
  annotations: Annotations;
  setAnnotations: (annotations: Annotations) => void;
  correctEstimationHistory: CorrectEstimationHistory;
  setCorrectEstimationHistory: (
    CorrectEstimationHistory: CorrectEstimationHistory,
  ) => void;
  goNextCallback: () => void;
  resetCallback: () => void;
}

type AnnotatingState =
  | 'YET'
  | 'JUDGE'
  | 'SEARCH'
  | 'SELECT'
  | 'EDIT'
  | 'DONE';

/** This component must be imported dynamically */
export const ExpAnnotator = ({
  repSoundId,
  annotations,
  setAnnotations,
  correctEstimationHistory,
  setCorrectEstimationHistory,
  goNextCallback,
  resetCallback,
}: AnnotatorProps) => {
  const addAnnotation = React.useCallback(
    (newVector: NumVector) => {
      const newAnnotations = {
        ...annotations,
        [repSoundId]: newVector,
      };
      setAnnotations(newAnnotations);
    },
    [annotations, setAnnotations, repSoundId],
  );

  const appendCorrectEstimationHistory = React.useCallback(
    (flg: CorrectEstimationFlg) => {
      const _correctEstimationHistory = [
        ...correctEstimationHistory,
      ].filter((hist) => hist[0] !== repSoundId);
      _correctEstimationHistory.push([repSoundId, flg]);
      setCorrectEstimationHistory(
        _correctEstimationHistory,
      );
    },
    [
      correctEstimationHistory,
      setCorrectEstimationHistory,
      repSoundId,
    ],
  );

  const deleteAnnotationCallback = React.useCallback(() => {
    const _annotations = { ...annotations };
    delete _annotations[repSoundId];
    setAnnotations(_annotations);
    setAnnotatingState('YET');
    if (audioRef.current === null) return;
    setIsPlayedOnce(!audioRef.current.paused);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [annotatingState, setAnnotatingState] =
    React.useState<AnnotatingState>('YET');

  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [annotationCount, setAnnotationCount] =
    React.useState(0);

  const [samplingPoints, setSamplingPoints] =
    React.useState<NumVector[] | null>(null);

  const [estimatedShapeVector, setEstimatedShapeVector] =
    React.useState<NumVector | null>(null);

  const [suggestionVectorsInfo, setSuggestionVectorsInfo] =
    React.useState<SuggestionVectorsInfo | null>(null);

  React.useEffect(() => {
    if (annotatingState !== 'YET') return;
    const _delaunayEstimator = new DelaunayEstimator(
      delaunayConfig.inputDim,
      delaunayConfig.outputDim,
    );
    setDelaunayEstimator(_delaunayEstimator);
  }, [annotatingState]);

  React.useEffect(() => {
    if (delaunayEstimator === null) return;
    let _annotationCount = 0;
    for (const [_rsId, vector] of Object.entries(
      annotations,
    )) {
      const _repSoundId = _rsId as RepSoundId;
      if (_repSoundId === repSoundId) {
        setAnnotatingState('DONE');
        const _samplingPoints =
          calcSamplingPointsFromFreq(vector);
        setSamplingPoints(_samplingPoints);
      }
      const coord = repSoundCoords[_repSoundId];
      delaunayEstimator.addPoint(coord, vector);
      _annotationCount += 1;
    }
    if (_annotationCount > 0) {
      const _estimatedShapeVector =
        delaunayEstimator.estimate(
          repSoundCoords[repSoundId],
        );
      const _suggestionVectorsInfo =
        delaunayEstimator.suggestVectors(
          repSoundCoords[repSoundId],
        );
      setEstimatedShapeVector(_estimatedShapeVector);
      setSuggestionVectorsInfo(_suggestionVectorsInfo);
    }
    setAnnotationCount(_annotationCount);
  }, [repSoundId, annotations, delaunayEstimator]);

  const startCallback = React.useCallback(() => {
    if (annotationCount <= delaunayConfig.inputDim) {
      setAnnotatingState('SELECT');
      return;
    }
    setAnnotatingState('JUDGE');
  }, [annotationCount]);

  const [selectedShapeId, setSelectedShapeId] =
    React.useState<SampleShapeId | null>(null);

  const selectCallback = React.useCallback(
    (shapeId: SampleShapeId) => {
      setSelectedShapeId(shapeId);
      setAnnotatingState('EDIT');
    },
    [],
  );

  const editConfirmCallback = React.useCallback(
    (shapeParams: ShapeParams) => {
      const freq = calcFreqFromParams(shapeParams);
      addAnnotation(freq);
      setAnnotatingState('DONE');
    },
    [addAnnotation],
  );

  const editCancelCallback = React.useCallback(() => {
    setAnnotatingState('SELECT');
  }, []);

  const isCorrectCallback = React.useCallback(() => {
    if (estimatedShapeVector === null) return;
    addAnnotation(estimatedShapeVector);
    appendCorrectEstimationHistory('CORRECT');
    setAnnotatingState('DONE');
  }, [
    estimatedShapeVector,
    addAnnotation,
    appendCorrectEstimationHistory,
  ]);

  const isNotCorrectCallback = React.useCallback(() => {
    if (estimatedShapeVector === null) return;
    setAnnotatingState('SEARCH');
  }, [estimatedShapeVector]);

  const foundCallback = React.useCallback(
    (shapeVector: NumVector) => {
      addAnnotation(shapeVector);
      appendCorrectEstimationHistory('SEARCH');
      setAnnotatingState('DONE');
    },
    [addAnnotation, appendCorrectEstimationHistory],
  );

  const notFoundCallback = React.useCallback(() => {
    appendCorrectEstimationHistory('SELECT');
    setAnnotatingState('SELECT');
  }, [appendCorrectEstimationHistory]);

  const [isPlayedOnce, setIsPlayedOnce] =
    React.useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        ステップ1-
        {annotatingState === 'DONE'
          ? annotationCount
          : annotationCount + 1}
      </h2>
      <audio
        src={url(`/audios/repSounds/${repSoundId}.wav`)}
        controls
        loop
        onPlay={() => setIsPlayedOnce(true)}
        ref={audioRef}
        className={styles.audio}
      />
      {annotatingState !== 'DONE' && !isPlayedOnce ? (
        <p>
          上の音を再生してください（音は繰り返し再生されます）。
        </p>
      ) : (
        <>
          {annotatingState === 'YET' && (
            <div className={styles.button__section}>
              <Button
                text={'この音に対する図形の回答を開始'}
                onClick={startCallback}
                className={styles.button}
              />
              {annotationCount > 0 && (
                <Button
                  text={
                    '全ての音に対する図形の回答をリセットし、図形の回答を始めから行う'
                  }
                  onClick={resetCallback}
                  className={`${styles.cancel__button} ${styles.button}`}
                />
              )}
            </div>
          )}
          {annotatingState === 'SELECT' && (
            <>
              <p className={styles.guide}>
                下の図形の中から、音に最も対応していると感じる図形を一つ選んでください。
              </p>
              <SampleShapeSelector
                selectCallback={selectCallback}
              />
            </>
          )}
          {annotatingState === 'EDIT' &&
            selectedShapeId !== null && (
              <>
                <p className={styles.guide}>
                  パラメータを微調節し、自分にとって最も音に対応すると感じるように図形を変形させてください。
                  <br />
                  既に対応していると感じる場合はそのままでも構いません。
                </p>
                <ShapeEditor
                  defaultShapeParams={
                    sampleShapes[selectedShapeId]
                  }
                  confirmCallback={editConfirmCallback}
                  cancelCallback={editCancelCallback}
                />
              </>
            )}
          {annotatingState === 'JUDGE' &&
            estimatedShapeVector !== null && (
              <>
                <p className={styles.guide}>
                  これまでのあなたの回答から、この音に対しては以下の図形が対応していると感じるのではないかと推定されました。
                  <br />
                  この図形が確かに音に対応していると感じる場合、「この図形で問題ない」を選択してください。
                  <br />
                  この図形では音に対応していないと感じる場合、「図形を修正する」を選択してください。
                </p>
                <CorrectEstimationJudger
                  estimatedShapeVector={
                    estimatedShapeVector
                  }
                  isCorrectCallback={isCorrectCallback}
                  isNotCorrectCallback={
                    isNotCorrectCallback
                  }
                />
              </>
            )}
          {annotatingState === 'SEARCH' &&
            estimatedShapeVector !== null &&
            suggestionVectorsInfo !== null && (
              <>
                <p className={styles.guide}>
                  パラメータを調節して、図形が音に対応すると感じるように変形させてください。
                  <br />
                  このパラメータでは対応すると感じる図形を作れない場合は、
                  <br />
                  「このパラメータでは対応すると感じる図形を作れない」を選択して下さい。
                </p>
                <ShapeSearcher
                  defaultShapeVector={estimatedShapeVector}
                  suggestionVectorsInfo={
                    suggestionVectorsInfo
                  }
                  foundCallback={foundCallback}
                  notFoundCallback={notFoundCallback}
                />
              </>
            )}
        </>
      )}
      {annotatingState === 'DONE' &&
        samplingPoints !== null && (
          <>
            <p className={styles.guide}>
              あなたがこの音に対応すると回答した図形は以下の通りです。
              <br />
              このままで問題ない場合は下の「次へ」ボタンを押してください。
            </p>
            <DrawSamplingPointsSketch
              canvasWidth={sketchWidth}
              canvasHeight={sketchWidth}
              samplingPoints={samplingPoints}
            />
            <div className={styles.button__section}>
              <Button
                text={'次へ'}
                onClick={goNextCallback}
                className={styles.button}
              />
              <Button
                text={'この音に対する図形の回答をやり直す'}
                onClick={deleteAnnotationCallback}
                className={`${styles.cancel__button} ${styles.button}`}
              />
              {annotationCount > 0 && (
                <Button
                  text={
                    '全ての音に対する図形の回答をリセットし、図形の回答を始めから行う'
                  }
                  onClick={resetCallback}
                  className={`${styles.cancel__button} ${styles.button}`}
                />
              )}
            </div>
          </>
        )}
    </div>
  );
};
