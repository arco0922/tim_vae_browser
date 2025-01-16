import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { RelationVisualizerProps } from '@app/components/RelationVisualizer';
import { ShapeLatentVisualizerProps } from '@app/components/ShapeLatentVisualizer';
import {
  latestVisualizerConfig,
  LatestVisualizerWorkletMessage,
} from '@app/constants/visualizerConfig';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { readFileAsText } from '@app/utils/readFileUtils';
import { downloadCanvasAsImage } from '@app/utils/saveSketchUtils';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './shapelatent.module.scss';

const ShapeLatentVisualizer = dynamic<
  ShapeLatentVisualizerProps<LatestVisualizerWorkletMessage>
>(
  () =>
    import('@app/components/ShapeLatentVisualizer').then(
      (module) => module.ShapeLatentVisualizer,
    ) as any,
  { ssr: false },
);

const RelationVisualizer = dynamic<
  RelationVisualizerProps<LatestVisualizerWorkletMessage>
>(
  () =>
    import('@app/components/RelationVisualizer').then(
      (module) => module.RelationVisualizer,
    ) as any,
  { ssr: false },
);

const SHAPE_LATENT_CANVAS_ID = 'shape__latent__cnv';

const ShapeLatentPage: NextPage = () => {
  const [annotations, setAnnotations] =
    React.useState<Annotations>({});

  const [hasError, setHasError] = React.useState<
    boolean | null
  >(null);

  const processTextHandler = React.useCallback(
    (text: string) => {
      const fileJSON = JSON.parse(text);
      if (
        fileJSON['annotations'] === undefined ||
        fileJSON['correctEstimationHistory'] === undefined
      ) {
        setHasError(true);
        return;
      }
      const annotations = fileJSON[
        'annotations'
      ] as Annotations;
      const correctEstimationHistory = fileJSON[
        'correctEstimationHistory'
      ] as CorrectEstimationHistory;

      if (
        judgeHasEndAnnotation(correctEstimationHistory) ===
        false
      ) {
        setHasError(true);
        return;
      }

      setAnnotations(annotations);
      setHasError(false);
    },
    [],
  );

  const readFileHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      if (input.files === null || input.files.length == 0)
        return;
      const file = input.files[0];

      readFileAsText(file).then((text) => {
        processTextHandler(text);
      });
    },
    [processTextHandler],
  );

  return (
    <div className={styles.container}>
      <h1>Shape Latent Visualizer</h1>
      {hasError === null ? (
        <p>Choose the annotation JSON file.</p>
      ) : hasError === true ? (
        <p className={styles.alert}>
          This file is invalid.
        </p>
      ) : null}
      <input
        type="file"
        accept="application/JSON"
        onChange={(e) => {
          readFileHandler(e);
        }}
      />
      {hasError === false && (
        <div className={styles.visualizer__section}>
          <Button
            text={'save image'}
            onClick={() =>
              downloadCanvasAsImage(
                SHAPE_LATENT_CANVAS_ID,
                'shape_latent.png',
              )
            }
          />
          <div className={styles.sketch__section}>
            <ShapeLatentVisualizer
              canvasId={SHAPE_LATENT_CANVAS_ID}
              annotations={annotations}
              visualizerConfig={latestVisualizerConfig}
              className={styles.shapelatent__visualizer}
            />
            <RelationVisualizer
              annotations={annotations}
              visualizerConfig={latestVisualizerConfig}
              className={styles.relation__visualizer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeLatentPage;
