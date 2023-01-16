import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { ShapeLatentVisualizerProps } from '@app/components/ShapeLatentVisualizer';
import {
  latestVisualizerConfig,
  LatestVisualizerWorkletMessage,
} from '@app/constants/visualizerConfig';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { readFileAsText } from '@app/utils/readFileUtils';
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
        <ShapeLatentVisualizer
          annotations={annotations}
          visualizerConfig={latestVisualizerConfig}
          className={styles.shapelatent__visualizer}
        />
      )}
    </div>
  );
};

export default ShapeLatentPage;
