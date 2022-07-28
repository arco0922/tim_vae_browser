import {
  Annotations,
  CorrectEstimationHistory,
  ExpOrder,
  ExpResults,
  Timestamp,
} from '@app/@types';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { countTested } from '@app/utils/testShapeUtils';
import { NextPage } from 'next';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteExpStorages } from '@app/utils/localStorageUtils';
import styles from './end.module.scss';
import { ExpErrorComponent } from '@app/components/ExpErrorComponent';

const EndPage: NextPage = () => {
  const router = useRouter();

  const [annotations] = useLocalStorage<Annotations>(
    localStorageKeys.EXP_ANNOTATIONS,
    {},
  );
  const [correctEstimationHistory] =
    useLocalStorage<CorrectEstimationHistory>(
      localStorageKeys.EXP_CORRECT_ESTIMATION_HISTORY,
      [],
    );
  const [expOrder] = useLocalStorage<ExpOrder>(
    localStorageKeys.EXP_ORDER,
    [],
  );
  const [expResults] = useLocalStorage<ExpResults>(
    localStorageKeys.EXP_RESULTS,
    {},
  );
  const [expTimestamp] = useLocalStorage<Timestamp[]>(
    localStorageKeys.EXP_TIMESTAMPS,
    [],
  );

  const [hasError, setHasError] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {
    if (
      expOrder.length === 0 ||
      !judgeHasEndAnnotation(correctEstimationHistory) ||
      countTested(expResults) !== expOrder.length ||
      expTimestamp.length === 0
    ) {
      setHasError(true);
      return;
    }
    const finalResults = {
      annotations,
      correctEstimationHistory,
      expOrder,
      expResults,
      expTimestamp,
    };
    const postResults = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/results`,
          finalResults,
        );
        const _userId = res.data.userId as string;
        setUserId(_userId);
        deleteExpStorages();
      } catch (err) {
        console.error(err);
        setHasError(true);
      }
    };
    postResults();
  }, [
    expOrder,
    correctEstimationHistory,
    expResults,
    annotations,
    expTimestamp,
  ]);

  if (hasError) {
    return <ExpErrorComponent />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>実験終了</h2>
      <div className={styles.guide}>
        <p>
          以上で実験は終了です。この度は、実験へのご協力ありがとうございました。
        </p>
        <p>
          あなたのIDは <b>{userId}</b> です。
          <br />
          こちらのIDをコピーしてLancersのページにてご回答ください。
        </p>
        <p>もうこのページを閉じて頂いて問題ありません。</p>
      </div>
    </div>
  );
};

export default EndPage;
