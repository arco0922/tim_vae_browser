import { Congruency, NumVector } from '@app/@types';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import React from 'react';
import styles from './CongruencyRator.module.scss';

interface Props {
  shapeVector: NumVector;
  selectCallback: (rating: Congruency) => void;
}

const sketchWidth = 150;

export const CongruencyRator = ({
  shapeVector,
  selectCallback,
}: Props) => {
  const selectHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(
        event.target.value,
      ) as any as Congruency;
      selectCallback(val);
    },
    [selectCallback],
  );

  return (
    <div className={styles.container}>
      <div className={styles.sketch__section}>
        <DrawSamplingPointsSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          samplingPoints={calcSamplingPointsFromFreq(
            shapeVector,
          )}
        />
      </div>
      <form className={styles.radio__form}>
        <div>
          <input
            type="radio"
            value="1"
            name="congruency"
            onChange={selectHandler}
          />
          1: 全く対応していると感じない
        </div>
        <div>
          <input
            type="radio"
            value="2"
            name="congruency"
            onChange={selectHandler}
          />
          2
        </div>
        <div>
          <input
            type="radio"
            value="3"
            name="congruency"
            onChange={selectHandler}
          />
          3
        </div>
        <div>
          <input
            type="radio"
            value="4"
            name="congruency"
            onChange={selectHandler}
          />
          4
        </div>
        <div>
          <input
            type="radio"
            value="5"
            name="congruency"
            onChange={selectHandler}
          />
          5
        </div>
        <div>
          <input
            type="radio"
            value="6"
            name="congruency"
            onChange={selectHandler}
          />
          6: 非常に対応していると感じる
        </div>
      </form>
    </div>
  );
};
