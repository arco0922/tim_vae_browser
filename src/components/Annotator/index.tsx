import {
  Annotations,
  NumVector,
  RepSoundId,
  SampleShapeId,
  ShapeParams,
} from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import { repSoundCoords } from '@app/constants/repSounds';
import { sampleShapes } from '@app/constants/sampleShapes';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import {
  calcFreqFromParams,
  calcSamplingPointsFromFreq,
} from '@app/utils/shapeUtils';
import { url } from '@app/utils/urlConfig';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../Button';
import { SampleShapeSelector } from './SampleShapeSelector';
import { ShapeEditor } from './ShapeEditor';
import styles from './Annotator.module.scss';

const sketchWidth = 150;

export interface AnnotatorProps {
  repSoundId: RepSoundId;
  annotations: Annotations;
  setAnnotations: (annotations: Annotations) => void;
}

type AnnotatingState =
  | 'YET'
  | 'SEARCH'
  | 'SELECT'
  | 'EDIT'
  | 'DONE';

/** This component must be imported dynamically */
export const Annotator = ({
  repSoundId,
  annotations,
  setAnnotations,
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
    setAnnotationCount(_annotationCount);
  }, [repSoundId, annotations, delaunayEstimator]);

  const startCallback = React.useCallback(() => {
    if (annotationCount <= delaunayConfig.inputDim) {
      setAnnotatingState('SELECT');
      return;
    }
    setAnnotatingState('SEARCH');
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

  const router = useRouter();

  const nextCallback = React.useCallback(() => {
    router.push('/settingshape');
  }, [router]);

  const resetCallback = React.useCallback(() => {
    setAnnotations({});
    router.push('/settingshape');
  }, [router, setAnnotations]);

  return (
    <>
      <p>SoundID : {repSoundId}</p>
      <audio
        src={url(`/audios/repSounds/${repSoundId}.wav`)}
        controls
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
      {annotatingState === 'SEARCH' && (
        <>
          <p>
            Adjust the parameters so that you feel the shape
            most congruent to the sound.
          </p>
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
            <Button text={'次へ'} onClick={nextCallback} />
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
