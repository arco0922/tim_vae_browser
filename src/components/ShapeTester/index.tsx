import {
  Annotations,
  Congruency,
  ExpResults,
  NumVector,
  TestMode,
} from '@app/@types';
import { delaunayConfig } from '@app/constants/delaunayConfig';
import {
  repSoundCoordsCollection,
  RepSoundId,
} from '@app/constants/repSounds';
import { DelaunayEstimator } from '@app/utils/DelaunayEstimator';
import { url } from '@app/utils/urlConfig';
import React from 'react';
import { Button } from '../Button';
import {
  expSoundCoords,
  ExpSoundId,
} from '@app/constants/expSounds';
import { calcRandomShapeParams } from '@app/utils/sliderUtils';
import { calcFreqFromParams } from '@app/utils/shapeUtils';
import { CongruencyRator } from './CongruencyRator';
import styles from './ShapeTester.module.scss';
import { EncoderId } from '@app/constants/encoders';

export interface ShapeTesterProps {
  encoderId: EncoderId;
  expSoundId: ExpSoundId;
  testMode: TestMode;
  expResults: ExpResults;
  setExpResults: (res: ExpResults) => void;
  annotations: Annotations;
  goNextCallback: () => void;
}

/** This component must be imported dynamically */
export const ShapeTester = ({
  encoderId,
  expSoundId,
  testMode,
  expResults,
  setExpResults,
  annotations,
  goNextCallback,
}: ShapeTesterProps) => {
  const addResult = React.useCallback(
    (congruency: Congruency) => {
      const idResult = expResults[expSoundId] || {};
      const newIdResult = {
        ...idResult,
        [testMode]: congruency,
      };
      const newResults = {
        ...expResults,
        [expSoundId]: newIdResult,
      };
      setExpResults(newResults);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [setExpResults, expSoundId, testMode],
  );

  const [delaunayEstimator, setDelaunayEstimator] =
    React.useState<DelaunayEstimator | null>(null);

  const [estimatedShapeVector, setEstimatedShapeVector] =
    React.useState<NumVector | null>(null);

  React.useEffect(() => {
    if (testMode !== 'SUGGEST') return;
    const _delaunayEstimator = new DelaunayEstimator(
      delaunayConfig.inputDim,
      delaunayConfig.outputDim,
    );
    setDelaunayEstimator(_delaunayEstimator);
  }, [testMode]);

  React.useEffect(() => {
    if (delaunayEstimator === null) return;
    const repSoundCoords =
      repSoundCoordsCollection[encoderId];
    if (repSoundCoords === undefined) return;
    let _annotationCount = 0;
    for (const [_rsId, vector] of Object.entries(
      annotations,
    )) {
      const _repSoundId = _rsId as RepSoundId;
      const coord = repSoundCoords[_repSoundId];
      delaunayEstimator.addPoint(coord, vector);
      _annotationCount += 1;
    }
    if (_annotationCount > 0) {
      const _estimatedShapeVector =
        delaunayEstimator.estimate(
          expSoundCoords[expSoundId],
        );
      setEstimatedShapeVector(_estimatedShapeVector);
    }
  }, [
    encoderId,
    expSoundId,
    annotations,
    delaunayEstimator,
  ]);

  const [randomShapeVector, setRandomShapeVector] =
    React.useState<NumVector | null>(null);

  React.useEffect(() => {
    if (testMode !== 'RANDOM') return;
    const randomShapeParams = calcRandomShapeParams();
    const _randomShapeVector = calcFreqFromParams(
      randomShapeParams,
    );
    setRandomShapeVector(_randomShapeVector);
  }, [testMode, expSoundId]);

  const [isPlayedOnce, setIsPlayedOnce] =
    React.useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [congruency, setCongruency] =
    React.useState<Congruency>(null);

  const answerCallback = React.useCallback(() => {
    if (congruency === null || audioRef.current === null)
      return;
    addResult(congruency);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlayedOnce(false);
    setEstimatedShapeVector(null);
    setRandomShapeVector(null);
    setCongruency(null);
    goNextCallback();
  }, [congruency, addResult, goNextCallback]);

  return (
    <div className={styles.container}>
      <audio
        src={url(`/audios/expSounds/${expSoundId}.wav`)}
        controls
        loop
        onPlay={() => setIsPlayedOnce(true)}
        ref={audioRef}
        className={styles.audio}
      />
      {!isPlayedOnce ? (
        <p className={styles.guide}>
          上の音を再生してください（音は繰り返し再生されます）。
        </p>
      ) : (
        <>
          <p className={styles.guide}>
            この図形が音に対してどの程度対応していると感じるか、下の線分上で該当する場所をクリックしてください。
          </p>
          {testMode === 'SUGGEST' &&
            estimatedShapeVector !== null && (
              <CongruencyRator
                shapeVector={estimatedShapeVector}
                congruency={congruency}
                setCongruency={setCongruency}
                className={styles.rator}
              />
            )}
          {testMode === 'RANDOM' &&
            randomShapeVector !== null && (
              <CongruencyRator
                shapeVector={randomShapeVector}
                congruency={congruency}
                setCongruency={setCongruency}
                className={styles.rator}
              />
            )}
          {congruency !== null && (
            <Button
              text={'次へ'}
              onClick={answerCallback}
              disabled={congruency === null}
            />
          )}
        </>
      )}
    </div>
  );
};
