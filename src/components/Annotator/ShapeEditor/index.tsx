import { Button } from '@app/components/Button';
import { SliderWithState } from '@app/components/SliderWithState';
import { sliderInfo } from '@app/constants/sliderInfo';
import React from 'react';
import { DrawFromParamSketchProps } from '@app/sketches/DrawFromParamSketch';
import { ShapeParams } from '@app/@types';
import styles from './ShapeEditor.module.scss';
import dynamic from 'next/dynamic';

const DrawFromParamSketch =
  dynamic<DrawFromParamSketchProps>(
    () =>
      import('../../../sketches/DrawFromParamSketch').then(
        (module) => module.DrawFromParamSketch,
      ) as any,
    { ssr: false },
  );

interface Props {
  defaultShapeParams: ShapeParams;
  confirmCallback: (shapeParams: ShapeParams) => void;
}

const sketchWidth = 150;

export const ShapeEditor = ({
  defaultShapeParams,
  confirmCallback,
}: Props) => {
  const cornNumInfo = sliderInfo.cornNum;
  const [cornNum, setCornNum] = React.useState<number>(
    defaultShapeParams.cornNum,
  );
  const cornAmpInfo = sliderInfo.cornAmp;
  const [cornAmp, setCornAmp] = React.useState<number>(
    defaultShapeParams.cornAmp,
  );
  const randomnessInfo = sliderInfo.randomness;
  const [randomness, setRandomness] =
    React.useState<number>(defaultShapeParams.randomness);
  const randomSeedInfo = sliderInfo.randomSeed;
  const [randomSeed, setRandomSeed] =
    React.useState<number>(defaultShapeParams.randomSeed);
  const innerCurveInfo = sliderInfo.innerCurve;
  const [innerCurve, setInnerCurve] =
    React.useState<number>(defaultShapeParams.innerCurve);
  const outerCurveInfo = sliderInfo.outerCurve;
  const [outerCurve, setOuterCurve] =
    React.useState<number>(defaultShapeParams.outerCurve);

  React.useEffect(() => {
    setCornNum(defaultShapeParams.cornNum);
    setCornAmp(defaultShapeParams.cornAmp);
    setRandomness(defaultShapeParams.randomness);
    setRandomSeed(defaultShapeParams.randomSeed);
    setInnerCurve(defaultShapeParams.innerCurve);
    setOuterCurve(defaultShapeParams.outerCurve);
  }, [defaultShapeParams]);

  return (
    <div className={styles.container}>
      <div className={styles.sketch__section}>
        <DrawFromParamSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          shapeParams={{
            cornNum,
            cornAmp,
            randomness,
            randomSeed,
            innerCurve,
            outerCurve,
          }}
        />
      </div>
      <div className={styles.edit__section}>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {cornNumInfo.label}
          </span>
          <SliderWithState
            value={cornNum}
            setValue={setCornNum}
            min={cornNumInfo.params.min}
            max={cornNumInfo.params.max}
            step={cornNumInfo.params.step}
            className={styles.slider}
          />
        </div>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {cornAmpInfo.label}
          </span>
          <SliderWithState
            value={cornAmp}
            setValue={setCornAmp}
            min={cornAmpInfo.params.min}
            max={cornAmpInfo.params.max}
            step={cornAmpInfo.params.step}
            className={styles.slider}
          />
        </div>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {randomnessInfo.label}
          </span>
          <SliderWithState
            value={randomness}
            setValue={setRandomness}
            min={randomnessInfo.params.min}
            max={randomnessInfo.params.max}
            step={randomnessInfo.params.step}
            className={styles.slider}
          />
        </div>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {randomSeedInfo.label}
          </span>
          <SliderWithState
            value={randomSeed}
            setValue={setRandomSeed}
            min={randomSeedInfo.params.min}
            max={randomSeedInfo.params.max}
            step={randomSeedInfo.params.step}
            className={styles.slider}
          />
        </div>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {innerCurveInfo.label}
          </span>
          <SliderWithState
            value={innerCurve}
            setValue={setInnerCurve}
            min={innerCurveInfo.params.min}
            max={innerCurveInfo.params.max}
            step={innerCurveInfo.params.step}
            className={styles.slider}
          />
        </div>
        <div className={styles.slider__wrapper}>
          <span className={styles.slider__label}>
            {outerCurveInfo.label}
          </span>
          <SliderWithState
            value={outerCurve}
            setValue={setOuterCurve}
            min={outerCurveInfo.params.min}
            max={outerCurveInfo.params.max}
            step={outerCurveInfo.params.step}
            className={styles.slider}
          />
        </div>
        <Button
          text={'決定'}
          className={styles.confirm__button}
        />
      </div>
    </div>
  );
};
