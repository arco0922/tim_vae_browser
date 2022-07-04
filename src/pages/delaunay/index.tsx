import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './delaunay.module.css';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <p className={styles.loading__text}>Loading...</p>
  ),
});

const gridX = new Array<number>(21)
  .fill(0)
  .map((_, idx) => idx - 10);
const gridY = new Array<number>(21)
  .fill(0)
  .map((_, idx) => idx - 10);

const initialZ = new Array(gridX.length)
  .fill(0)
  .map(() => new Array<number>(gridY.length).fill(0));

const Delaunay: NextPage = () => {
  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [zData, setZData] =
    React.useState<number[][]>(initialZ);

  React.useEffect(() => {
    const _delaunayEstimator = new DelaunayEstimator(2, 1);
    setDelaunayEstimator(_delaunayEstimator);
  }, []);

  const addPointCallback = React.useCallback(() => {
    if (delaunayEstimator === null) return;
    const randX = Math.random() * 10 - 5;
    const randY = Math.random() * 10 - 5;
    const _z = (randX * randX + randY * randY) / 100;
    delaunayEstimator.addPoint([randX, randY], [_z]);
    const _zData = new Array(gridX.length)
      .fill(0)
      .map(() => new Array<number>(gridY.length).fill(0));
    for (let ix = 0; ix < gridX.length; ix++) {
      for (let iy = 0; iy < gridY.length; iy++) {
        const x = gridX[ix];
        const y = gridY[iy];
        _zData[ix][iy] = delaunayEstimator.estimate([
          x,
          y,
        ])[0];
      }
    }
    setZData(_zData);
  }, [delaunayEstimator]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Delaunay Estimator Demo
      </h1>
      <div>
        <p>Ground Truth : z = ( x * x + y * y ) / 100</p>
        <p>
          By clicking <b>Add Point</b> button, one sample
          point is randomly added from the range -5 &lt; x
          &lt; 5, -5 &lt; y &lt; 5.
        </p>
      </div>
      <div className={styles.figure__container}>
        <Plot
          data={[
            {
              type: 'surface',
              x: gridX,
              y: gridY,
              z: zData,
            },
          ]}
          layout={{
            width: 600,
            height: 600,
            margin: { t: 20, b: 20, r: 0, l: 0 },
          }}
        />
        <button
          className={styles.add__button}
          onClick={addPointCallback}
        >
          Add Point
        </button>
      </div>
    </div>
  );
};

export default Delaunay;
