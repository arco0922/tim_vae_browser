import p5 from 'p5';

export interface P5WithProps<P> extends p5 {
  props: P;
}

export type NumVector = number[];
export type NumMatrix = number[][];

export type RepSoundId =
  | 'rs1_00'
  | 'rs1_01'
  | 'rs1_02'
  | 'rs2_00'
  | 'rs2_01'
  | 'rs2_02'
  | 'rs2_03'
  | 'rs2_04'
  | 'rs2_05'
  | 'rs2_06'
  | 'rs2_07'
  | 'rs2_08'
  | 'rs2_09'
  | 'rs2_10'
  | 'rs2_11'
  | 'rs2_12'
  | 'rs2_13'
  | 'rs2_14'
  | 'rs2_15'
  | 'rs2_16'
  | 'rs2_17'
  | 'rs2_18'
  | 'rs2_19'
  | 'rs2_20'
  | 'rs2_21'
  | 'rs2_22'
  | 'rs2_23'
  | 'rs2_24'
  | 'rs2_25'
  | 'rs2_26'
  | 'rs2_27'
  | 'rs2_28'
  | 'rs2_29';

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

export type Point2D = {
  x: number;
  y: number;
};
