import { Image } from '@app/components/Image';
import { SampleShapeId } from '@app/constants/sampleShapes';
import { url } from '@app/utils/urlConfig';
import styles from './SampleShapeItem.module.scss';

interface Props {
  index: number;
  sampleShapeId: SampleShapeId;
  selectCallback: () => void;
  disabled?: boolean;
}

export const SampleShapeItem = ({
  index,
  sampleShapeId,
  selectCallback,
  disabled = false,
}: Props) => {
  return (
    <div
      onClick={() => {
        if (disabled) return;
        selectCallback();
      }}
      className={`${styles.container} ${
        !disabled ? styles.active : ''
      }`}
    >
      <p className={styles.index__label}>{index}</p>
      <Image
        className={styles.shape__image}
        src={url(`/imgs/sampleShapes/${sampleShapeId}.jpg`)}
        alt={`${index} shape`}
        width={150}
        height={150}
      />
    </div>
  );
};
