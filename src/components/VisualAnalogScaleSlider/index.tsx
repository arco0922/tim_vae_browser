import React from 'react';
import { SliderWithState } from '../SliderWithState';
import styles from './VisualAnalogScaleSlider.module.scss';

interface Props {
  labelLeft: string;
  labelRight: string;
  value: number | null;
  setValue: (value: number | null) => void;
}

export const VisualAnalogScaleSlider = ({
  labelLeft,
  labelRight,
  value,
  setValue,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>{labelLeft}</p>
      </div>
      <SliderWithState
        min={0}
        max={100}
        step={1}
        value={value !== null ? value : 50}
        setValue={setValue}
        className={styles.slider}
      />
      <div className={styles.label}>
        <p>{labelRight}</p>
      </div>
    </div>
  );
};
