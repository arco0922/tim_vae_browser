import { Annotations, NumVector } from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import {
  repSoundCoordsCollection,
  RepSoundId,
} from '@app/constants/repSounds';
import {
  VisualizerConfig,
  WorkletMessage,
} from '@app/constants/visualizerConfig';
import { DrawMousePosOnLatentSketchProps } from '@app/sketches/DrawMousePosOnLatentSketch';
import { DrawSamplingPointsSketchProps } from '@app/sketches/DrawSamplingPointsSketch';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './RelationVisualizer.module.scss';

const DrawMousePosOnLatentSketch =
  dynamic<DrawMousePosOnLatentSketchProps>(
    () =>
      import(
        '@app/sketches/DrawMousePosOnLatentSketch'
      ).then(
        (module) => module.DrawMousePosOnLatentSketch,
      ) as any,
    { ssr: false },
  );

const DrawSamplingPointsSketch =
  dynamic<DrawSamplingPointsSketchProps>(
    () =>
      import('@app/sketches/DrawSamplingPointsSketch').then(
        (module) => module.DrawSamplingPointsSketch,
      ) as any,
    { ssr: false },
  );

const sketchWidth = 500;

export interface RelationVisualizerProps<
  P extends WorkletMessage,
> {
  annotations: Annotations;
  visualizerConfig: VisualizerConfig<P>;
  className?: string;
}

export const RelationVisualizer = <
  P extends WorkletMessage,
>({
  annotations,
  visualizerConfig,
  className,
}: RelationVisualizerProps<P>) => {
  const [coord, setCoord] =
    React.useState<NumVector | null>([0, 0]);

  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [annotationCount, setAnnotationCount] =
    React.useState(0);

  const [
    estimatedSamplingPoints,
    setEstimatedSamplingPoints,
  ] = React.useState<NumVector[] | null>(null);

  React.useEffect(() => {
    const _delaunayEstimator = new DelaunayEstimator(
      delaunayConfig.inputDim,
      delaunayConfig.outputDim,
    );
    setDelaunayEstimator(_delaunayEstimator);
  }, [annotations]);

  React.useEffect(() => {
    if (
      delaunayEstimator === null ||
      annotations === undefined
    )
      return;
    const repSoundCoords =
      repSoundCoordsCollection[visualizerConfig.encoderId];
    if (repSoundCoords === undefined) return;
    let _annotationCount = 0;
    for (const [_rsId, vector] of Object.entries(
      annotations,
    )) {
      const _repSoundId = _rsId as RepSoundId;
      const coord = repSoundCoords[_repSoundId];
      delaunayEstimator.addPoint(coord, vector);
      _annotationCount += 1;
    }
    setAnnotationCount(_annotationCount);
  }, [
    visualizerConfig.encoderId,
    annotations,
    delaunayEstimator,
  ]);

  /** Update Estimation of delaunay estimator */
  React.useEffect(() => {
    if (
      delaunayEstimator === null ||
      coord === null ||
      annotationCount === 0
    )
      return;

    const _estimatedF = delaunayEstimator.estimate(coord);
    const _estimatedSamplingPoints =
      calcSamplingPointsFromFreq(_estimatedF);

    setEstimatedSamplingPoints(_estimatedSamplingPoints);
  }, [coord, delaunayEstimator, annotationCount]);

  return (
    <div
      className={`${styles.container} ${className || ''}`}
    >
      <div className={styles.sketch__section}>
        <DrawMousePosOnLatentSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          latentImgInfo={visualizerConfig.latentImgInfo}
          coord={coord}
          setCoord={setCoord}
        />
        <DrawSamplingPointsSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          samplingPoints={estimatedSamplingPoints}
        />
      </div>
    </div>
  );
};
