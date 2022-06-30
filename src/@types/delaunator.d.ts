declare module 'delaunator' {
  class Delaunator {
    constructor(coords: Float64Array);
    static from(coords: number[][]): Delaunator;
    triangles: Uint32Array;
    hull: Uint32Array;
    halfedges: Uint32Array;
  }

  export = Delaunator;
}
