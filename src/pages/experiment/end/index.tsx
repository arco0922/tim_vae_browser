import {
  Annotations,
  CorrectEstimationHistory,
  ExpOrder,
  ExpResults,
} from '@app/@types';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { judgeHasEndAnnotation } from '@app/utils/annotatorUtils';
import { countTested } from '@app/utils/testShapeUtils';
import { NextPage } from 'next';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import { Button } from '@app/components/Button';
import { useRouter } from 'next/router';
import { deleteExpStorages } from '@app/utils/localStorageUtils';

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

  const [hasError, setHasError] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {
    if (
      expOrder.length === 0 ||
      !judgeHasEndAnnotation(correctEstimationHistory) ||
      countTested(expResults) !== expOrder.length
    ) {
      setHasError(true);
      return;
    }
    const finalResults = {
      annotations,
      correctEstimationHistory,
      expOrder,
      expResults,
    };
    const postResults = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/results`,
        finalResults,
      );
      const _userId = res.data.userId as string;
      setUserId(_userId);
      deleteExpStorages();
    };
    postResults();
  }, [
    expOrder,
    correctEstimationHistory,
    expResults,
    annotations,
  ]);

  const resetCallback = React.useCallback(() => {
    deleteExpStorages();
    router.push('/experiment');
  }, [router]);

  return (
    <div>
      {hasError ? (
        <>
          <p>
            実験を途中で中断してしまったようです。大変恐縮ですが、再度始めから実験をやり直してください。
          </p>
          <Button
            text={'始めから実験をやり直す'}
            onClick={resetCallback}
          />
        </>
      ) : (
        <>
          <p>実験へのご協力ありがとうございました。</p>
          <p>あなたのIDは {userId} です。</p>
        </>
      )}
    </div>
  );
};

export default EndPage;
