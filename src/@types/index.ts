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

export type ExpSoundId =
  | 'es_1'
  | 'es_2'
  | 'es_3'
  | 'es_4'
  | 'es_5'
  | 'es_6'
  | 'es_7'
  | 'es_8'
  | 'es_9'
  | 'es_10'
  | 'es_11'
  | 'es_12'
  | 'es_13'
  | 'es_14'
  | 'es_15'
  | 'es_16'
  | 'es_17'
  | 'es_18'
  | 'es_19'
  | 'es_20'
  | 'es_21'
  | 'es_22'
  | 'es_23'
  | 'es_24'
  | 'es_25'
  | 'es_26'
  | 'es_27'
  | 'es_28'
  | 'es_29'
  | 'es_30';

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

export type Annotations = {
  [repSoundId in RepSoundId]?: NumVector;
};

export type CorrectEstimationHistory = [
  rsid: RepSoundId,
  flg: boolean,
][];

export type TestMode = 'SUGGEST' | 'RANDOM';

export type Congruency = 1 | 2 | 3 | 4 | 5 | 6;

export type ExpResults = {
  [expSoundId in ExpSoundId]?: {
    [testMode in TestMode]?: Congruency;
  };
};

export type ExpOrder = {
  expSoundId: ExpSoundId;
  testMode: TestMode;
}[];

export type TimeStamp = {
  [path: string]: number;
};
