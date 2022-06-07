import type { NextPage } from 'next';
import styles from '../styles/Top.module.css';

const Top: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Timbre-VAE on browser</h1>
    </div>
  );
};

export default Top;
