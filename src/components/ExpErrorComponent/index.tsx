import { Button } from '@app/components/Button';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ExpErrorComponent.module.scss';

export const ExpErrorComponent = () => {
  const router = useRouter();
  const resetCallback = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment');
  }, [router]);
  return (
    <div className={styles.container}>
      <p className={styles.guide}>
        実験が中断されたか、実験中にエラーが発生してしまったようです。
        <br />
        大変恐縮ですが、再度始めから実験をやり直してください。
      </p>
      <Button
        text={'始めから実験をやり直す'}
        onClick={resetCallback}
      />
    </div>
  );
};
