import { calcRandomShapeParams } from './sliderUtils';
import { NumVector } from '@app/@types';
import { calcFreqFromParams } from './shapeUtils';

export class RandomShapeGenerator {
  changeDurationMin: number;
  changeDurationMax: number;
  totalDuration: number;
  shapeFreqs: NumVector[] = [];
  durations: number[] = [];

  constructor(
    changeDurationMin: number,
    changeDurationMax: number,
    totalDuration: number,
  ) {
    this.changeDurationMin = changeDurationMin;
    this.changeDurationMax = changeDurationMax;
    this.totalDuration = totalDuration;
    this.initShapeFreqsAndDurations();
  }

  initShapeFreqsAndDurations() {
    let curTotalDuration = 0;
    while (curTotalDuration <= this.totalDuration) {
      const duration =
        this.changeDurationMin +
        Math.random() *
          (this.changeDurationMax - this.changeDurationMin);
      this.durations.push(duration);
      curTotalDuration += duration;
    }
    for (let _ = 0; _ <= this.durations.length; _++) {
      const randomShapeParams = calcRandomShapeParams();
      const randomShapeFreqs = calcFreqFromParams(
        randomShapeParams,
      );
      this.shapeFreqs.push(randomShapeFreqs);
    }
  }

  estimate(time: number) {
    let former = 0;
    let rest = time;
    while (true) {
      if (rest - this.durations[former] > 0) {
        rest -= this.durations[former];
        former += 1;
      } else {
        break;
      }
    }
    const latter = former + 1;
    if (former < 0 || latter >= this.shapeFreqs.length)
      return null;

    const latterRatio = rest / this.durations[former];
    const formerRatio = 1 - latterRatio;

    const estimatedFreq = this._linearInterpolateVector(
      [formerRatio, latterRatio],
      [this.shapeFreqs[former], this.shapeFreqs[latter]],
    );

    return estimatedFreq;
  }

  _linearInterpolateVector(
    ratio: number[],
    vectors: NumVector[],
  ): NumVector {
    const num = ratio.length;
    if (num === 0) return [] as NumVector;

    const dim = vectors[0].length;

    const resVector = new Array<number>(dim).fill(
      0,
    ) as NumVector;

    for (let i = 0; i < dim; i++) {
      for (let n = 0; n < num; n++) {
        resVector[i] += ratio[n] * vectors[n][i];
      }
    }

    return resVector;
  }
}
