import { Annotations } from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import {
  repSoundCoordsCollection,
  RepSoundId,
} from '@app/constants/repSounds';
import {
  VisualizerConfig,
  WorkletMessage,
} from '@app/constants/visualizerConfig';
import {
  SamplingPointsCollection,
  ShapeLatentSketchProps,
} from '@app/sketches/ShapeLatentSketch';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './ShapeLatentVisualizer.module.scss';

const ShapeLatentSketch = dynamic<ShapeLatentSketchProps>(
  () =>
    import('@app/sketches/ShapeLatentSketch').then(
      (module) => module.ShapeLatentSketch,
    ) as any,
  { ssr: false },
);

const canvasWidth = 800;

const splitX = 15;
const splitY = 15;

export interface ShapeLatentVisualizerProps<
  P extends WorkletMessage,
> {
  canvasId?: string;
  annotations: Annotations;
  visualizerConfig: VisualizerConfig<P>;
  className?: string;
}

export const ShapeLatentVisualizer = <
  P extends WorkletMessage,
>({
  canvasId,
  annotations,
  visualizerConfig,
  className,
}: ShapeLatentVisualizerProps<P>) => {
  const visualizeCoordList = React.useMemo(() => {
    const { xmax, xmin, ymax, ymin } =
      visualizerConfig.latentImgInfo;
    const dx = (xmax - xmin) / (splitX * 2);
    const dy = (ymax - ymin) / (splitY * 2);
    const _visualizeCoordList = [];
    for (let i = 0; i < splitX; i++) {
      for (let j = 0; j < splitY; j++) {
        const x = xmin + (2 * i + 1) * dx;
        const y = ymin + (2 * j + 1) * dy;
        _visualizeCoordList.push([x, y]);
      }
    }
    return _visualizeCoordList;
  }, [visualizerConfig]);

  const canvasHeight = React.useMemo(
    () =>
      visualizerConfig.latentImgInfo.aspectRatio
        ? canvasWidth *
          visualizerConfig.latentImgInfo.aspectRatio
        : canvasWidth,
    [visualizerConfig],
  );

  const radius = React.useMemo(
    () =>
      Math.min(
        canvasWidth / (2 * splitX),
        canvasHeight / (2 * splitY),
      ) * 0.75,
    [canvasHeight],
  );

  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [annotationCount, setAnnotationCount] =
    React.useState(0);

  const [
    samplingPointsCollection,
    setSamplingPointsCollection,
  ] = React.useState<SamplingPointsCollection>([]);

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
    if (delaunayEstimator === null || annotationCount === 0)
      return;

    const _samplingPointsCollection =
      [] as SamplingPointsCollection;

    visualizeCoordList.forEach((coord) => {
      const _estimatedF = delaunayEstimator.estimate(coord);
      const _estimatedSamplingPoints =
        calcSamplingPointsFromFreq(_estimatedF);

      _samplingPointsCollection.push({
        coord,
        samplingPoints: _estimatedSamplingPoints,
      });
    });

    setSamplingPointsCollection(_samplingPointsCollection);
  }, [
    visualizeCoordList,
    delaunayEstimator,
    annotationCount,
  ]);

  return (
    <div
      className={`${styles.container} ${className || ''}`}
    >
      <ShapeLatentSketch
        canvasId={canvasId}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        latentImgInfo={visualizerConfig.latentImgInfo}
        samplingPointsCollection={samplingPointsCollection}
        radius={radius}
      />
    </div>
  );
};
