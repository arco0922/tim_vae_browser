import { ShapeParameterKey } from '@app/@types';

type SliderInfo = {
  [key in ShapeParameterKey]: {
    label: string;
    params: { min: number; max: number; step: number };
  };
};

export const sliderInfo: SliderInfo = {
  cornNum: {
    label: 'ツノの本数',
    params: { min: 5, max: 30, step: 1 },
  },
  cornAmp: {
    label: 'ツノの長さ',
    params: {
      min: 0,
      max: 0.5,
      step: 0.01,
    },
  },
  randomness: {
    label: 'ランダムの度合い',
    params: { min: 0, max: 1, step: 0.01 },
  },
  randomSeed: {
    label: 'ランダムのさせ方',
    params: { min: 1, max: 20, step: 1 },
  },
  innerCurve: {
    label: 'ツノの根元の丸さ',
    params: { min: 0, max: 1, step: 0.01 },
  },
  outerCurve: {
    label: 'ツノの先端の丸さ',
    params: { min: 0, max: 1, step: 0.01 },
  },
};
