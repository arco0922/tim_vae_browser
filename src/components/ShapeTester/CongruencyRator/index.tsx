import { Congruency, NumVector } from '@app/@types';
import { VisualAnalogScaleSlider } from '@app/components/VisualAnalogScaleSlider';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import React from 'react';
import styles from './CongruencyRator.module.scss';

interface Props {
  shapeVector: NumVector;
  congruency: Congruency;
  setCongruency: (congruency: Congruency) => void;
  className?: string;
}

const sketchWidth = 150;

export const CongruencyRator = ({
  shapeVector,
  congruency,
  setCongruency,
  className,
}: Props) => {
  return (
    <div
      className={`${styles.container} ${
        className ? className : ''
      }`}
    >
      <div className={styles.sketch__section}>
        <DrawSamplingPointsSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          samplingPoints={calcSamplingPointsFromFreq(
            shapeVector,
          )}
        />
      </div>
      <VisualAnalogScaleSlider
        labelLeft={'全く対応していると感じない'}
        labelRight={'完全に対応していると感じる'}
        value={congruency}
        setValue={setCongruency}
      />
    </div>
  );
};
