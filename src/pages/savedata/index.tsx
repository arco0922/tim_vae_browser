import {
  Annotations,
  CorrectEstimationHistory,
} from '@app/@types';
import { Button } from '@app/components/Button';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { NextPage } from 'next';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './savedata.module.scss';

const SaveDataPage: NextPage = () => {
  const [userId, setUserId] = React.useState<string>('');

  const [annotations] = useLocalStorage<Annotations>(
    localStorageKeys.ANNOTATIONS,
    {},
  );
  const [correctEstimationHistory] =
    useLocalStorage<CorrectEstimationHistory>(
      localStorageKeys.CORRECT_ESTIMATION_HISTORY,
      [],
    );

  const downloadJson = React.useCallback(() => {
    if (userId === '') return;
    const data = {
      userId,
      annotations,
      correctEstimationHistory,
    };
    const blob = new Blob(
      [JSON.stringify(data, null, ' ')],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userId}_annotations_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [annotations, correctEstimationHistory, userId]);

  return (
    <div className={styles.container}>
      <div>
        <span>実験参加者ID </span>
        <input
          type={'text'}
          onChange={(e) => setUserId(e.target.value)}
        />
        {userId === '' && (
          <p className={styles.caution}>
            実験参加者IDを入力してください
          </p>
        )}
      </div>
      <div>
        <Button
          text={'Download Annotations'}
          onClick={downloadJson}
          disabled={userId === ''}
        />
      </div>
    </div>
  );
};

export default SaveDataPage;
