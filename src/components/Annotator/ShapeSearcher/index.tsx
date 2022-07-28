import { NumVector } from '@app/@types';
import { DrawSamplingPointsSketchProps } from '@app/sketches/DrawSamplingPointsSketch';
import { SuggestionVectorsInfo } from '@app/utils/DelaunayEstimator';
import { calcSamplingPointsFromFreq } from '@app/utils/shapeUtils';
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './ShapeSearcher.module.scss';
import * as math from 'mathjs';
import { SliderWithState } from '@app/components/SliderWithState';
import { Button } from '@app/components/Button';

const DrawSamplingPointsSketch =
  dynamic<DrawSamplingPointsSketchProps>(
    () =>
      import(
        '../../../sketches/DrawSamplingPointsSketch'
      ).then(
        (module) => module.DrawSamplingPointsSketch,
      ) as any,
    { ssr: false },
  );
interface Props {
  defaultShapeVector: NumVector;
  suggestionVectorsInfo: SuggestionVectorsInfo;
  foundCallback?: (shapeVector: NumVector) => void;
  notFoundCallback?: () => void;
}

const sketchWidth = 150;

export const ShapeSearcher = ({
  defaultShapeVector,
  suggestionVectorsInfo,
  foundCallback,
  notFoundCallback,
}: Props) => {
  const [
    suggestionVectorCoefficients,
    setSuggestionVectorCoefficients,
  ] = React.useState<NumVector>(
    new Array<number>(suggestionVectorsInfo.length).fill(0),
  );

  const updateCoefficient = React.useCallback(
    (idx: number, value: number) => {
      const _coefficients = [
        ...suggestionVectorCoefficients,
      ];
      _coefficients[idx] = value;
      setSuggestionVectorCoefficients(_coefficients);
    },
    [suggestionVectorCoefficients],
  );

  const [shapeVector, setShapeVector] =
    React.useState<NumVector>(defaultShapeVector);

  const [samplingPoints, setSamplingPoints] =
    React.useState<NumVector[]>(
      calcSamplingPointsFromFreq(defaultShapeVector),
    );

  React.useEffect(() => {
    let _shapeVector = [...defaultShapeVector];
    suggestionVectorCoefficients.forEach((coeff, idx) => {
      _shapeVector = math.add(
        _shapeVector,
        math.multiply(
          coeff,
          suggestionVectorsInfo[idx].vector,
        ),
      ) as NumVector;
    });
    setShapeVector(_shapeVector);
  }, [
    defaultShapeVector,
    suggestionVectorsInfo,
    suggestionVectorCoefficients,
  ]);

  React.useEffect(() => {
    const _samplingPoints =
      calcSamplingPointsFromFreq(shapeVector);
    setSamplingPoints(_samplingPoints);
  }, [shapeVector]);

  return (
    <div className={styles.container}>
      <div className={styles.searcher__section}>
        <div className={styles.sketch__section}>
          <DrawSamplingPointsSketch
            canvasWidth={sketchWidth}
            canvasHeight={sketchWidth}
            samplingPoints={samplingPoints}
          />
        </div>
        <div className={styles.edit__section}>
          <div className={styles.slider__section}>
            {suggestionVectorsInfo.map(
              (suggestionVectorInfo, idx) => {
                return (
                  <div
                    className={styles.slider__wrapper}
                    key={`slider_${idx}`}
                  >
                    <SliderWithState
                      value={
                        suggestionVectorCoefficients[idx]
                      }
                      setValue={(val) =>
                        updateCoefficient(idx, val)
                      }
                      min={
                        suggestionVectorInfo.minCoefficient
                      }
                      max={
                        suggestionVectorInfo.maxCoefficient
                      }
                      step={
                        (suggestionVectorInfo.maxCoefficient -
                          suggestionVectorInfo.minCoefficient) /
                        100
                      }
                      className={styles.slider}
                    />
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div className={styles.button__section}>
        {foundCallback !== undefined && (
          <Button
            text={'この図形で決定'}
            className={styles.confirm__button}
            onClick={() => foundCallback(shapeVector)}
          />
        )}
        {notFoundCallback && (
          <Button
            text={
              'このパラメータでは対応すると感じる図形を作れない'
            }
            className={styles.cancel__button}
            onClick={notFoundCallback}
          />
        )}
      </div>
    </div>
  );
};
