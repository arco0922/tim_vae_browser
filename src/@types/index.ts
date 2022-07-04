import p5 from 'p5';

export interface P5WithProps<P> extends p5 {
  props: P;
}

export type NumVector = number[];
export type NumMatrix = number[][];

export type SampleShapeId =
  | 'ss00'
  | 'ss01'
  | 'ss02'
  | 'ss03'
  | 'ss04'
  | 'ss05'
  | 'ss06'
  | 'ss07'
  | 'ss08'
  | 'ss09'
  | 'ss10'
  | 'ss11'
  | 'ss12'
  | 'ss13'
  | 'ss14'
  | 'ss15'
  | 'ss16'
  | 'ss17'
  | 'ss18'
  | 'ss19'
  | 'ss20'
  | 'ss21'
  | 'ss22'
  | 'ss23'
  | 'ss24';

export type ShapeParameterKey =
  | 'cornNum'
  | 'cornAmp'
  | 'randomness'
  | 'randomSeed'
  | 'innerCurve'
  | 'outerCurve';

export type ShapeParams = {
  [key in ShapeParameterKey]: number;
};
