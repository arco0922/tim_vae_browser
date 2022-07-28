import { ExpSoundId } from '@app/constants/expSounds';
import { RepSoundId } from '@app/constants/repSounds';
import p5 from 'p5';

export interface P5WithProps<P> extends p5 {
  props: P;
}

export type NumVector = number[];
export type NumMatrix = number[][];

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

export type CorrectEstimationFlg =
  | 'CORRECT'
  | 'SEARCH'
  | 'SELECT';

export type CorrectEstimationHistory = [
  rsid: RepSoundId,
  flg: CorrectEstimationFlg,
][];

export type TestMode = 'SUGGEST' | 'RANDOM';

export type Congruency = number | null;

export type ExpResults = {
  [expSoundId in ExpSoundId]?: {
    [testMode in TestMode]?: Congruency;
  };
};

export type ExpOrder = {
  expSoundId: ExpSoundId;
  testMode: TestMode;
}[];

export type Timestamp = [path: string, time: number];
