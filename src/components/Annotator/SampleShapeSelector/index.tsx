import { SampleShapeId } from '@app/@types';
import { sampleShapeIds } from '@app/constants/sampleShapes';
import { shuffle } from '@app/utils/arrayUtils';
import React from 'react';
import { SampleShapeItem } from './SampleShapeItem';
import styles from './SampleShapeSelector.module.scss';

interface Props {
  selectCallback: (shapeId: SampleShapeId) => void;
}

export const SampleShapeSelector = ({
  selectCallback,
}: Props) => {
  const [randorandomizedSampleShapeIds, _] = React.useState<
    SampleShapeId[]
  >(shuffle(sampleShapeIds));

  return (
    <div className={styles.container}>
      {randorandomizedSampleShapeIds.map((id, idx) => (
        <SampleShapeItem
          key={id}
          sampleShapeId={id}
          index={idx + 1}
          selectCallback={() => selectCallback(id)}
        />
      ))}
    </div>
  );
};
