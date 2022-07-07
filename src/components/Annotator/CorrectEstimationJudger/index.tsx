import { NumVector } from '@app/@types';
import { Button } from '@app/components/Button';
import { DrawSamplingPointsSketch } from '@app/sketches/DrawSamplingPointsSketch';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import styles from './CorrectEstimationJudger.module.scss';

interface Props {
  estimatedShapeVector: NumVector;
  isCorrectCallback: () => void;
  isNotCorrectCallback: () => void;
}

const sketchWidth = 150;

export const CorrectEstimationJudger = ({
  estimatedShapeVector,
  isCorrectCallback,
  isNotCorrectCallback,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sketch__section}>
        <DrawSamplingPointsSketch
          canvasWidth={sketchWidth}
          canvasHeight={sketchWidth}
          samplingPoints={calcSamplingPointsFromFreq(
            estimatedShapeVector,
          )}
        />
      </div>
      <div className={styles.edit__section}>
        <div className={styles.button__section}>
          <Button
            text={'しっくりくる'}
            className={styles.confirm__button}
            onClick={isCorrectCallback}
          />

          <Button
            text={'しっくりこない'}
            className={styles.cancel__button}
            onClick={isNotCorrectCallback}
          />
        </div>
      </div>
    </div>
  );
};
