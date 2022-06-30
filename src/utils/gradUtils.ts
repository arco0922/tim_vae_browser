import { NumMatrix, NumVector } from '@app/@types';
import Matrix, { inverse } from 'ml-matrix';

/** Calculate Jacobian by WLS(Weighted Least Squares) method */

export const calcJacobian = (
  point: NumVector,
  vector: NumVector,
  adjPoints: NumVector[],
  adjVectors: NumVector[],
): NumMatrix => {
  const inputDim = point.length;
  const outputDim = vector.length;
  const dr = adjPoints.map((adjPoint) =>
    adjPoint.map((u, i) => u - point[i]),
  );
  const weights = dr.map((d) => {
    const s = d.reduce((p, x) => p + x * x, 0);
    return s === 0 ? 1 : 1 / s;
  });
  const dv = adjVectors.map((adjVector) =>
    adjVector.map((v, i) => v - vector[i]),
  );
  const _A = new Array(inputDim)
    .fill(0)
    .map(() => new Array<number>(inputDim).fill(0));
  const _B = new Array(outputDim)
    .fill(0)
    .map(() => new Array<number>(inputDim).fill(0));
  for (
    let iPoint = 0;
    iPoint < adjPoints.length;
    iPoint++
  ) {
    for (let i = 0; i < inputDim; i++) {
      for (let j = 0; j < inputDim; j++) {
        _A[i][j] +=
          weights[iPoint] * dr[iPoint][j] * dr[iPoint][i];
      }
    }
    for (let i = 0; i < outputDim; i++) {
      for (let j = 0; j < inputDim; j++) {
        _B[i][j] +=
          weights[iPoint] * dr[iPoint][j] * dv[iPoint][i];
      }
    }
  }
  const A = new Matrix(_A);
  const B = new Matrix(_B);
  const invA = inverse(A, true);
  const jacobian = B.mmul(invA).to2DArray() as NumMatrix;
  return jacobian;
};
