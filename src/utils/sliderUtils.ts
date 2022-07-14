import {
  ShapeParameterKey,
  ShapeParams,
} from '@app/@types';
import { sliderInfo } from './../constants/sliderInfo';

export const calcRandomValueInSlider = ({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step: number;
}) => {
  const maxIndex = Math.floor((max - min) / step);
  const randomIndex = Math.floor(Math.random() * maxIndex);
  return min + randomIndex * step;
};

export const calcRandomShapeParams = () => {
  const shapeParameterKeys: ShapeParameterKey[] = [
    'cornNum',
    'cornAmp',
    'randomness',
    'randomSeed',
    'innerCurve',
    'outerCurve',
  ];
  const randomShapeParams: Partial<ShapeParams> = {};

  shapeParameterKeys.forEach((key) => {
    const val = calcRandomValueInSlider(
      sliderInfo[key].params,
    );
    randomShapeParams[key] = val;
  });

  return randomShapeParams as any as ShapeParams;
};
