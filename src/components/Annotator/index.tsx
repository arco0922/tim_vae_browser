import {
  Annotations,
  CorrectEstimationHistory,
  NumVector,
  RepSoundId,
  SampleShapeId,
  ShapeParams,
} from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import { repSoundCoords } from '@app/constants/repSounds';
import { sampleShapes } from '@app/constants/sampleShapes';
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
export const Annotator = ({
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [setAnnotations],
  );

  const appendCorrectEstimationHistory = React.useCallback(
    (flg: boolean) => {
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
    appendCorrectEstimationHistory(true);
    setAnnotatingState('DONE');
  }, [
    estimatedShapeVector,
    addAnnotation,
    appendCorrectEstimationHistory,
  ]);

  const isNotCorrectCallback = React.useCallback(() => {
    if (estimatedShapeVector === null) return;
    appendCorrectEstimationHistory(false);
    setAnnotatingState('SEARCH');
  }, [
    estimatedShapeVector,
    appendCorrectEstimationHistory,
  ]);

  const foundCallback = React.useCallback(
    (shapeVector: NumVector) => {
      addAnnotation(shapeVector);
      setAnnotatingState('DONE');
    },
    [addAnnotation],
  );

  const notFoundCallback = React.useCallback(() => {
    setAnnotatingState('SELECT');
  }, []);

  return (
    <>
      <p>SoundID : {repSoundId}</p>
      <audio
        src={url(`/audios/repSounds/${repSoundId}.wav`)}
        controls
        loop
      />
      {annotatingState === 'YET' && (
        <>
          <Button
            text={'この音の図形の選択を開始'}
            onClick={startCallback}
          />
          <Button
            text={'全ての音に対する図形の選択をリセット'}
            onClick={resetCallback}
            className={styles.cancel__button}
          />
        </>
      )}
      {annotatingState === 'SELECT' && (
        <>
          <p>
            Select one shape that you feel most congruent to
            the sound.
          </p>
          <SampleShapeSelector
            selectCallback={selectCallback}
          />
        </>
      )}
      {annotatingState === 'EDIT' &&
        selectedShapeId !== null && (
          <>
            <p>
              Adjust the parameters so that you feel the
              shape most congruent to the sound.
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
            <p>
              Do you feel this shape is congruent with the
              sound?
            </p>
            <CorrectEstimationJudger
              estimatedShapeVector={estimatedShapeVector}
              isCorrectCallback={isCorrectCallback}
              isNotCorrectCallback={isNotCorrectCallback}
            />
          </>
        )}
      {annotatingState === 'SEARCH' &&
        estimatedShapeVector !== null &&
        suggestionVectorsInfo !== null && (
          <>
            <p>
              Adjust the parameters so that you feel the
              shape most congruent to the sound.
            </p>
            <ShapeSearcher
              defaultShapeVector={estimatedShapeVector}
              suggestionVectorsInfo={suggestionVectorsInfo}
              foundCallback={foundCallback}
              notFoundCallback={notFoundCallback}
            />
          </>
        )}
      {annotatingState === 'DONE' &&
        samplingPoints !== null && (
          <>
            <DrawSamplingPointsSketch
              canvasWidth={sketchWidth}
              canvasHeight={sketchWidth}
              samplingPoints={samplingPoints}
            />
            <Button
              text={'次へ'}
              onClick={goNextCallback}
            />
            <Button
              text={'この音に対する図形の選択をやり直す'}
              onClick={deleteAnnotationCallback}
              className={styles.cancel__button}
            />
            <Button
              text={'全ての音に対する図形の選択をリセット'}
              onClick={resetCallback}
              className={styles.cancel__button}
            />
          </>
        )}
    </>
  );
};
