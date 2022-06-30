import { calcJacobian } from './gradUtils';
import Delaunator from 'delaunator';
import * as math from 'mathjs';
import { NumMatrix, NumVector } from '@app/@types';
import Matrix, { inverse } from 'ml-matrix';

type PointId = number;
type SimplexId = number;
type FacetId = number;

interface FoundSimplexInfo {
  iSimplex: SimplexId;
  barycentricCoordInSimplex: NumVector;
}

interface FoundNearestFacetInfo {
  iFacet: FacetId;
  barycentricCoordOfNearestPoint: NumVector;
  ordinaryCoordOfNearestPoint: NumVector;
}

export class DelaunayEstimator {
  inputDim: number;
  outputDim: number;

  points: NumVector[];
  vectors: NumVector[];

  simplexPointIds: PointId[][];
  simplexVectors: NumVector[][];
  hullFacetPointIds: PointId[][];
  hullFacetVectors: NumVector[][];

  simplexTransforms: NumMatrix[];
  hullFacetJacobians: NumMatrix[][];

  constructor(inputDim: number, outputDim: number) {
    this.inputDim = inputDim;
    this.outputDim = outputDim;
    this.points = [];
    this.vectors = [];
    this.simplexPointIds = [];
    this.simplexVectors = [];
    this.hullFacetPointIds = [];
    this.hullFacetVectors = [];
    this.simplexTransforms = [];
    this.hullFacetJacobians = [];
  }

  addPoint(coord: NumVector, vector: NumVector) {
    this.points.push(coord);
    this.vectors.push(vector);
    this._updateDelaunay();
    this._updateSimplexTransforms();
    this._updateHullFacetJacobians();
    return;
  }

  estimate(coord: NumVector) {
    const { iSimplex, barycentricCoordInSimplex } =
      this._findSimplex(coord);
    if (iSimplex >= 0) {
      const res = this._linearInterpolateVector(
        barycentricCoordInSimplex,
        this.simplexVectors[iSimplex],
      );
      return res;
    }

    const {
      iFacet,
      barycentricCoordOfNearestPoint,
      ordinaryCoordOfNearestPoint,
    } = this._findNearestFacet(coord);
    const vectorAtFacet = this._linearInterpolateVector(
      barycentricCoordOfNearestPoint,
      this.hullFacetVectors[iFacet],
    );
    const jacobianAtFacet = this._linearInterpolateMatrix(
      barycentricCoordOfNearestPoint,
      this.hullFacetJacobians[iFacet],
    );
    const dr = math.subtract(
      coord,
      ordinaryCoordOfNearestPoint,
    );
    const res = this._firstOrderApproximation(
      vectorAtFacet,
      jacobianAtFacet,
      dr,
    );
    return res;
  }

  _updateDelaunay() {
    if (this.inputDim === 2) {
      const delaunay = Delaunator.from(this.points);

      const _simplexPointIds = delaunay.triangles;
      const simplexPointIds = [] as PointId[][];
      const simplexVectors = [] as NumVector[][];
      for (let i = 0; i < _simplexPointIds.length; i += 3) {
        simplexPointIds.push([
          _simplexPointIds[i],
          _simplexPointIds[i + 1],
          _simplexPointIds[i + 2],
        ]);
        simplexVectors.push([
          this.vectors[_simplexPointIds[i]],
          this.vectors[_simplexPointIds[i + 1]],
          this.vectors[_simplexPointIds[i + 2]],
        ]);
      }

      const _hull = delaunay.hull;
      const hullFacetPointIds = [] as PointId[][];
      const hullFacetVectors = [] as NumVector[][];
      if (_hull.length < this.inputDim + 1) {
        hullFacetPointIds.push(Array.from(_hull));
        hullFacetVectors.push(
          Array.from(_hull).map((pId) => this.vectors[pId]),
        );
      } else {
        for (let i = 0; i < _hull.length; i++) {
          hullFacetPointIds.push([
            _hull[i],
            _hull[(i + 1) % _hull.length],
          ]);
          hullFacetVectors.push([
            this.vectors[_hull[i]],
            this.vectors[_hull[(i + 1) % _hull.length]],
          ]);
        }
      }

      this.simplexPointIds = simplexPointIds;
      this.simplexVectors = simplexVectors;
      this.hullFacetPointIds = hullFacetPointIds;
      this.hullFacetVectors = hullFacetVectors;
      return;
    }
    return;
  }

  _updateSimplexTransforms() {
    const simplexTransforms = [] as NumMatrix[];
    for (
      let iSimplex = 0;
      iSimplex < this.simplexPointIds.length;
      iSimplex++
    ) {
      const iSimplexTransform = new Array(this.inputDim + 1)
        .fill(0)
        .map(() =>
          new Array<number>(this.inputDim).fill(0),
        );
      for (let j = 0; j < this.inputDim; j++) {
        iSimplexTransform[this.inputDim][j] =
          this.points[
            this.simplexPointIds[iSimplex][this.inputDim]
          ][j];
      }
      const _T = new Array(this.inputDim)
        .fill(0)
        .map(() =>
          new Array<number>(this.inputDim).fill(0),
        );
      for (let i = 0; i < this.inputDim; i++) {
        for (let j = 0; j < this.inputDim; j++) {
          _T[i][j] =
            this.points[this.simplexPointIds[iSimplex][j]][
              i
            ] -
            this.points[
              this.simplexPointIds[iSimplex][this.inputDim]
            ][i];
        }
      }
      const T = new Matrix(_T);
      const invT = inverse(T, true).to2DArray();
      for (let i = 0; i < this.inputDim; i++) {
        for (let j = 0; j < this.inputDim; j++) {
          iSimplexTransform[i][j] = invT[i][j];
        }
      }
      simplexTransforms.push(iSimplexTransform);
    }

    this.simplexTransforms = simplexTransforms;
  }

  _updateHullFacetJacobians() {
    const hullFacetJacobians = [] as NumMatrix[][];
    for (
      let iFacet = 0;
      iFacet < this.hullFacetPointIds.length;
      iFacet++
    ) {
      const iFacetJacobian = [] as NumMatrix[];
      const hullPoints = this.hullFacetPointIds[iFacet];

      for (let i = 0; i < hullPoints.length; i++) {
        const hullPointId = hullPoints[i];
        const adjPointsIds =
          this._findAdjPointIds(hullPointId);
        const adjPoints = [] as number[][];
        const adjVectors = [] as number[][];
        adjPointsIds.forEach((pId) => {
          adjPoints.push(this.points[pId]);
          adjVectors.push(this.vectors[pId]);
        });
        const jacobi = calcJacobian(
          this.points[hullPointId],
          this.vectors[hullPointId],
          adjPoints,
          adjVectors,
        );
        iFacetJacobian.push(jacobi);
      }
      hullFacetJacobians.push(iFacetJacobian);
    }

    this.hullFacetJacobians = hullFacetJacobians;
    return;
  }

  _findAdjPointIds(pointId: PointId): Set<PointId> {
    const adjPoints = new Set<PointId>();
    if (this.simplexPointIds.length === 0) {
      this.points.forEach((_, pId) => {
        if (pId !== pointId) {
          adjPoints.add(pId);
        }
      });
    } else {
      this.simplexPointIds.forEach((simplex) => {
        const _simplex = new Set(simplex);
        if (_simplex.has(pointId)) {
          simplex.forEach((pId) => {
            if (pId !== pointId) {
              adjPoints.add(pId);
            }
          });
        }
      });
    }
    return adjPoints;
  }

  _findSimplex(coord: NumVector): FoundSimplexInfo {
    const eps = 0.00001;
    for (
      let iSimplex = 0;
      iSimplex < this.simplexPointIds.length;
      iSimplex++
    ) {
      const barycentricCoordInSimplex =
        this._calcBarycentricCoordInSimplex(
          coord,
          iSimplex,
        );
      let isInside = true;
      for (
        let i = 0;
        i < barycentricCoordInSimplex.length;
        i++
      ) {
        if (
          barycentricCoordInSimplex[i] < -eps ||
          barycentricCoordInSimplex[i] > 1 + eps
        ) {
          isInside = false;
        }
      }
      if (isInside) {
        return {
          iSimplex,
          barycentricCoordInSimplex,
        };
      }
    }
    return {
      iSimplex: -1,
      barycentricCoordInSimplex: [],
    };
  }

  _findNearestFacet(
    coord: NumVector,
  ): FoundNearestFacetInfo {
    let bestDist = Infinity;
    let bestIFacet = -1;
    let bestBarycentricCoordOfNearestPoint =
      [] as NumVector;
    let bestOrdinaryCoordOfNearestPoint = [] as NumVector;

    for (
      let iFacet = 0;
      iFacet < this.hullFacetPointIds.length;
      iFacet++
    ) {
      const barycentricCoordOfNearestPoint =
        this._calcBarycentricCoordOfNearestPointInFacet(
          coord,
          iFacet,
        );
      const ordinaryCoordOfNearestPoint =
        this._calcOrdinaryCoordFromBarycentricCoordInFacet(
          barycentricCoordOfNearestPoint,
          iFacet,
        );
      const dist = math.norm(
        math.subtract(coord, ordinaryCoordOfNearestPoint),
      ) as number;
      if (dist < bestDist) {
        bestDist = dist;
        bestIFacet = iFacet;
        bestBarycentricCoordOfNearestPoint =
          barycentricCoordOfNearestPoint;
        bestOrdinaryCoordOfNearestPoint =
          ordinaryCoordOfNearestPoint;
      }
    }

    return {
      iFacet: bestIFacet,
      barycentricCoordOfNearestPoint:
        bestBarycentricCoordOfNearestPoint,
      ordinaryCoordOfNearestPoint:
        bestOrdinaryCoordOfNearestPoint,
    };
  }

  _calcBarycentricCoordOfNearestPointInFacet(
    coord: NumVector,
    iFacet: FacetId,
  ) {
    const numPointsInIFacet =
      this.hullFacetPointIds[iFacet].length;

    if (numPointsInIFacet === 1) {
      return [1.0];
    }

    const U = new Array(numPointsInIFacet - 1)
      .fill(0)
      .map((_, idx) =>
        math.subtract(
          this.points[this.hullFacetPointIds[iFacet][idx]],
          this.points[
            this.hullFacetPointIds[iFacet][
              numPointsInIFacet - 1
            ]
          ],
        ),
      );
    const r = math.subtract(
      coord,
      this.points[
        this.hullFacetPointIds[iFacet][
          numPointsInIFacet - 1
        ]
      ],
    );

    const A = new Array(numPointsInIFacet - 1)
      .fill(0)
      .map(() => new Array<number>(numPointsInIFacet - 1));
    for (let i = 0; i < numPointsInIFacet - 1; i++) {
      for (let j = 0; j < numPointsInIFacet - 1; j++) {
        A[i][j] = math.dot(U[i], U[j]);
      }
    }

    const b = new Array<number>(numPointsInIFacet - 1).fill(
      0,
    );
    for (let i = 0; i < numPointsInIFacet - 1; i++) {
      b[i] = math.dot(U[i], r);
    }

    const _c = math.multiply(
      math.inv(A),
      b,
    ) as any as NumVector;

    const c = new Array<number>(numPointsInIFacet).fill(0);
    c[numPointsInIFacet - 1] = 1.0;
    for (let i = 0; i < numPointsInIFacet - 1; i++) {
      c[i] = _c[i];
      c[numPointsInIFacet - 1] -= _c[i];
    }

    return c;
  }

  _calcOrdinaryCoordFromBarycentricCoordInFacet(
    barycentricCoord: NumVector,
    iFacet: FacetId,
  ) {
    const facetPoints = this.hullFacetPointIds[iFacet].map(
      (pId) => this.points[pId],
    );
    const ordinaryCoord = this._linearInterpolateVector(
      barycentricCoord,
      facetPoints,
    );
    return ordinaryCoord;
  }

  _calcBarycentricCoordInSimplex(
    coord: NumVector,
    iSimplex: SimplexId,
  ): NumVector {
    const dim = coord.length;
    const C = new Array<number>(dim + 1).fill(0);
    C[dim] = 1.0;
    const transform = this.simplexTransforms[iSimplex];
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        C[i] +=
          transform[i][j] * (coord[j] - transform[dim][j]);
      }
      C[dim] -= C[i];
    }
    return C;
  }

  _linearInterpolateVector(
    ratio: number[],
    vectors: NumVector[],
  ) {
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

  _linearInterpolateMatrix(
    ratio: number[],
    matrixes: NumMatrix[],
  ) {
    const num = ratio.length;
    if (num === 0) return [] as NumMatrix;

    const dim1 = matrixes[0].length;
    const dim2 = matrixes[0][0].length;

    const resMatrix = new Array(dim1)
      .fill(0)
      .map(() =>
        new Array<number>(dim2).fill(0),
      ) as NumMatrix;

    for (let i = 0; i < dim1; i++) {
      for (let j = 0; j < dim2; j++) {
        for (let n = 0; n < num; n++) {
          resMatrix[i][j] += ratio[n] * matrixes[n][i][j];
        }
      }
    }

    return resMatrix;
  }

  _firstOrderApproximation(
    vector: NumVector,
    jacobian: NumMatrix,
    dr: NumVector,
  ) {
    const res = math.add(
      vector,
      math.multiply(jacobian, dr),
    ) as NumVector;
    return res;
  }
}
