import { ShapeParameterKey } from '@app/@types';

type SliderInfo = {
  [key in ShapeParameterKey]: {
    label: string;
    params: { min: number; max: number; step: number };
  };
};

export const sliderInfo: SliderInfo = {
  cornNum: {
    label: 'Number of Spikes',
    params: { min: 5, max: 30, step: 1 },
  },
  cornAmp: {
    label: 'Length of Spikes',
    params: {
      min: 0,
      max: 0.5,
      step: 0.01,
    },
  },
  randomness: {
    label: 'Randomness',
    params: { min: 0, max: 1, step: 0.01 },
  },
  randomSeed: {
    label: 'Random Seed',
    params: { min: 1, max: 20, step: 1 },
  },
  innerCurve: {
    label: 'Roundness of the Base of Spikes',
    params: { min: 0, max: 1, step: 0.01 },
  },
  outerCurve: {
    label: 'Roundness of the Tip of Spikes',
    params: { min: 0, max: 1, step: 0.01 },
  },
};
