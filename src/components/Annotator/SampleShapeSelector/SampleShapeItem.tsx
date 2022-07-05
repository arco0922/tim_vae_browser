import { SampleShapeId } from '@app/@types';
import Image from 'next/image';
import styles from './SampleShapeItem.module.scss';

interface Props {
  index: number;
  sampleShapeId: SampleShapeId;
  selectCallback: () => void;
}

export const SampleShapeItem = ({
  index,
  sampleShapeId,
  selectCallback,
}: Props) => {
  return (
    <div
      onClick={selectCallback}
      className={styles.container}
    >
      <p className={styles.index__label}>{index}</p>
      <Image
        className={styles.shape__image}
        src={`/imgs/sampleShapes/${sampleShapeId}.jpg`}
        alt={`${index} shape`}
        width={150}
        height={150}
      />
    </div>
  );
};
