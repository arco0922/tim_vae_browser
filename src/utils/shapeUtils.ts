import {
  Point2D,
  ShapeParams,
  NumVector,
} from '@app/@types';
import FFT from 'fft.js';
import p5 from 'p5';

const DIFFERENTIAL_STEP_NUM = 2000; // 各ベジェ曲線を何分割して道のりを計算するか (周長の精度に関わる)
const SAMPLE_NUM = 512; // 図形全体を何点にサンプリングするか
const SAMPLING_RADIUS = 1; // 図形をサンプリングするときの便宜的な半径

/** 1つのベジェ曲線は4つの操作点により作成される */
type BezierOperator = [Point2D, Point2D, Point2D, Point2D];

/** Component uses this function must be imported dynamically */
export const calcFreqFromParams = ({
  cornNum,
  cornAmp,
  randomness,
  randomSeed,
  outerCurve,
  innerCurve,
}: ShapeParams): NumVector => {
  const p = new p5(() => {});

  // 図形パラメータからサンプル点をフーリエ変換した周波数領域の配列を返す。(0,0)を中心とする。

  const { samplingPointsX, samplingPointsY } =
    calcSamplingPointsFromParams({
      p,
      cornNum,
      cornAmp,
      randomness,
      randomSeed,
      innerCurve,
      outerCurve,
    });

  const freqX = fft(samplingPointsX);
  const freqY = fft(samplingPointsY);

  return [...freqX, ...freqY];
};

export const calcSamplingPointsFromFreq = (
  freq: NumVector,
): NumVector[] => {
  const size = freq.length / 4;
  const freqX = freq.slice(0, size * 2);
  const freqY = freq.slice(size * 2);

  const samplingPointsX = ifft(freqX);
  const samplingPointsY = ifft(freqY);

  const samplingPoints = samplingPointsX.map((x, idx) => [
    x,
    samplingPointsY[idx],
  ]);

  return samplingPoints;
};

/**
 * 1つのベジェ曲線に対してdistArrayを計算
 * distarray[i]に始点からi番目の点までの道のりを格納
 * distarray[0] = 0, distarray[steps] = L
 */
const calcDistArray = ({
  p,
  bezierOperator,
}: {
  p: p5;
  bezierOperator: BezierOperator;
}): number[] => {
  let l = 0;
  let prevX = bezierOperator[0].x;
  let prevY = bezierOperator[0].y;
  let curX = prevX;
  let curY = prevY;
  const distArray = Array<number>(
    DIFFERENTIAL_STEP_NUM + 1,
  );

  for (let i = 0; i <= DIFFERENTIAL_STEP_NUM; i++) {
    curX = p.bezierPoint(
      bezierOperator[0].x,
      bezierOperator[1].x,
      bezierOperator[2].x,
      bezierOperator[3].x,
      i / DIFFERENTIAL_STEP_NUM,
    );
    curY = p.bezierPoint(
      bezierOperator[0].y,
      bezierOperator[1].y,
      bezierOperator[2].y,
      bezierOperator[3].y,
      i / DIFFERENTIAL_STEP_NUM,
    );
    l += p.dist(prevX, prevY, curX, curY);
    distArray[i] = l;
    prevX = curX;
    prevY = curY;
  }
  return distArray;
};

/**
 * 1つのベジェ曲線中に含まれるサンプル点を計算
 */
const calcSamplingPointsInBezier = ({
  p,
  bezierOperator,
  distArray,
  offset, // 0番目のセグメントの長さ(始点から、最初のプロットまでの長さ)
  segmentL, // 1番目以降のセグメントの長さ
}: {
  p: p5;
  bezierOperator: BezierOperator;
  distArray: number[];
  offset: number;
  segmentL: number;
}) => {
  let segmentIndex = 0;
  const pointsX: number[] = [];
  const pointsY: number[] = [];

  for (let i = 0; i <= DIFFERENTIAL_STEP_NUM; i++) {
    if (distArray[i] >= segmentL * segmentIndex + offset) {
      const pointX = p.bezierPoint(
        bezierOperator[0].x,
        bezierOperator[1].x,
        bezierOperator[2].x,
        bezierOperator[3].x,
        i / DIFFERENTIAL_STEP_NUM,
      );
      const pointY = p.bezierPoint(
        bezierOperator[0].y,
        bezierOperator[1].y,
        bezierOperator[2].y,
        bezierOperator[3].y,
        i / DIFFERENTIAL_STEP_NUM,
      );
      pointsX.push(pointX);
      pointsY.push(pointY);
      segmentIndex += 1;
    }
  }

  // rest: 次に続くベジェ曲線におけるsegmentL0の長さ
  const rest =
    offset +
    segmentIndex * segmentL -
    distArray[DIFFERENTIAL_STEP_NUM];

  return { pointsX, pointsY, rest };
};

const calcSamplingPointsFromParams = ({
  p,
  cornNum,
  cornAmp,
  randomness,
  randomSeed,
  outerCurve,
  innerCurve,
}: { p: p5 } & ShapeParams) => {
  p.randomSeed(randomSeed);

  // 頂点の位置を決めてから、間をベジェ曲線で結ぶ

  /**
   * 頂点位置を極座標で管理する
   * pointsR: r座標
   * pointsTheta: Θ座標
   */
  const pointsR = Array<number>(cornNum * 2);
  const pointsTheta = Array<number>(cornNum * 2);

  //まずは、頂点の位置を決める
  for (let i = 0; i < 2 * cornNum; i++) {
    pointsR[i] =
      SAMPLING_RADIUS *
      (1 +
        cornAmp * p.pow(-1, i) +
        randomness * p.random(-1, 1) * 0.4);
    pointsTheta[i] =
      (p.PI * i) / cornNum -
      p.PI / 2 +
      (randomness * p.random(-1, 1) * p.PI) / cornNum;
  }

  /** i番目に、i番目のベジェ曲線の4操作点の座標を記録する */
  const bezierOperatorArray = Array<BezierOperator>(
    cornNum * 2,
  );

  /** 各要素は長さ DIFFERENTIAL_STEP_NUM + 1 の配列
   * [i][j]にi番目のベジェ曲線について、そのベジェ曲線の始点からj番目の微分点までの累積の道のりを記録する
   * [i][diffentialStepNum] でi番目のベジェ曲線の長さが分かる */
  const distArrays = Array<number[]>(cornNum * 2);

  for (let i = 0; i < 2 * cornNum; i++) {
    // i番目のベジェ曲線について考える

    // 始点と終点の座標の計算
    const startIndex = i;
    const endIndex = (i + 1) % (2 * cornNum);
    const startX =
      pointsR[startIndex] * p.cos(pointsTheta[startIndex]);
    const startY =
      pointsR[startIndex] * p.sin(pointsTheta[startIndex]);
    const endX =
      pointsR[endIndex] * p.cos(pointsTheta[endIndex]);
    const endY =
      pointsR[endIndex] * p.sin(pointsTheta[endIndex]);

    // 操作点方向の単位ベクトル
    const n1 = p.createVector(-startY, startX).normalize();
    const n2 = p.createVector(endY, -endX).normalize();

    // 操作点の計算 (ツノの外側か内側かで処理が異なる)
    let x1, y1, x2, y2;
    let bezierOperator: BezierOperator;
    if (startIndex % 2 == 0) {
      // 外側の点の場合
      x1 =
        startX + (SAMPLING_RADIUS / 2) * outerCurve * n1.x;
      y1 =
        startY + (SAMPLING_RADIUS / 2) * outerCurve * n1.y;
      x2 = endX + (SAMPLING_RADIUS / 2) * innerCurve * n2.x;
      y2 = endY + (SAMPLING_RADIUS / 2) * innerCurve * n2.y;
      bezierOperator = [
        { x: startX, y: startY },
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: endX, y: endY },
      ];
      bezierOperatorArray[i] = bezierOperator;
      distArrays[i] = calcDistArray({
        p,
        bezierOperator,
      });
    } else {
      // 内側の点の場合
      x1 =
        startX + (SAMPLING_RADIUS / 2) * innerCurve * n1.x;
      y1 =
        startY + (SAMPLING_RADIUS / 2) * innerCurve * n1.y;
      x2 = endX + (SAMPLING_RADIUS / 2) * outerCurve * n2.x;
      y2 = endY + (SAMPLING_RADIUS / 2) * outerCurve * n2.y;
      bezierOperator = [
        { x: startX, y: startY },
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: endX, y: endY },
      ];
      bezierOperatorArray[i] = bezierOperator;
      distArrays[i] = calcDistArray({
        p,
        bezierOperator,
      });
    }
  }

  // 図形全体の周長overallLengthを計算
  let overallLength = 0;
  distArrays.forEach(
    (distArray) =>
      (overallLength += distArray[DIFFERENTIAL_STEP_NUM]),
  );

  // サンプリング間隔segmentLを計算
  const segmentL = overallLength / SAMPLE_NUM;

  // サンプル点の座標を計算 (xとyをsamplingPointsXとsamplingPointsYに別々に格納)
  let offset = 0; // 1つ前のベジェ曲線での余り
  let samplingPointsX: number[] = [];
  let samplingPointsY: number[] = [];

  for (let i = 0; i < 2 * cornNum; i++) {
    const { pointsX, pointsY, rest } =
      calcSamplingPointsInBezier({
        p,
        bezierOperator: bezierOperatorArray[i],
        distArray: distArrays[i],
        offset,
        segmentL,
      });
    samplingPointsX = [...samplingPointsX, ...pointsX];
    samplingPointsY = [...samplingPointsY, ...pointsY];
    offset = rest;
  }

  // 誤差の関係でサンプル点の数が SAMPLE_NUM + 1 になってしまうことがあるので削減
  while (samplingPointsX.length > SAMPLE_NUM) {
    samplingPointsX.pop();
    samplingPointsY.pop();
  }

  return { samplingPointsX, samplingPointsY };
};

const fft = (y: number[]) => {
  const fft = new FFT(y.length);
  const _y = fft.toComplexArray(y, null);
  const f = fft.createComplexArray() as number[];
  fft.transform(f, _y);
  return f;
};

const ifft = (f: number[]) => {
  const size = f.length / 2;
  const fft = new FFT(size);
  const _y = fft.createComplexArray();
  fft.inverseTransform(_y, f);
  const y = fft.fromComplexArray(_y, null) as number[];
  return y;
};
