import {
  Annotations,
  ExpOrder,
  ExpResults,
} from '@app/@types';
import { ShapeTesterProps } from '@app/components/ShapeTester';
import { expSoundIds } from '@app/constants/expSounds';
import { localStorageKeys } from '@app/constants/localStorageKeys';
import { shuffle } from '@app/utils/arrayUtils';
import { countTested } from '@app/utils/testShapeUtils';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import useLocalStorage from 'use-local-storage';

const ShapeTester = dynamic<ShapeTesterProps>(
  () =>
    import('@app/components/ShapeTester').then(
      (module) => module.ShapeTester,
    ) as any,
  { ssr: false },
);

const suggestOrder: ExpOrder = expSoundIds.map((esId) => {
  return { expSoundId: esId, testMode: 'SUGGEST' };
});
const randomOrder: ExpOrder = expSoundIds.map((esId) => {
  return { expSoundId: esId, testMode: 'RANDOM' };
});

const initialExpOrder = shuffle([
  ...suggestOrder,
  ...randomOrder,
]);

export const TestShapeId: NextPage = () => {
  const router = useRouter();
  const { order } = router.query;

  const [expOrder] = useLocalStorage<ExpOrder>(
    localStorageKeys.EXP_ORDER,
    initialExpOrder,
  );

  const [expResults, setExpResults] =
    useLocalStorage<ExpResults>(
      localStorageKeys.EXP_RESULTS,
      {},
    );

  const [annotations] = useLocalStorage<Annotations>(
    localStorageKeys.EXP_ANNOTATIONS,
    {},
  );

  const goNextCallback = React.useCallback(() => {
    if (
      order === undefined ||
      typeof order === 'object' ||
      Number(order) === NaN ||
      Number(order) <= 0 ||
      Number(order) > expOrder.length
    ) {
      return;
    }
    const orderIdx = Number(order);
    if (orderIdx === expOrder.length) {
      router.push('/experiment/end');
      return;
    }
    router.push(`/experiment/testshape/${orderIdx + 1}`);
  }, [order, router, expOrder.length]);

  React.useEffect(() => {
    if (
      order === undefined ||
      typeof order === 'object' ||
      Number(order) === NaN ||
      Number(order) <= 0 ||
      Number(order) > expOrder.length
    ) {
      router.push('/experiment/testshape');
      return;
    }
    const orderIdx = Number(order);
    console.log(countTested(expResults));
    if (countTested(expResults) !== orderIdx - 1) {
      router.push('/experiment/testshape');
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  if (
    order === undefined ||
    typeof order === 'object' ||
    Number(order) === NaN ||
    Number(order) <= 0 ||
    Number(order) > expOrder.length
  ) {
    return null;
  }

  const orderIdx = Number(order);

  return (
    <div>
      <h2>ステップ2-{orderIdx}</h2>
      <ShapeTester
        expSoundId={expOrder[orderIdx - 1].expSoundId}
        testMode={expOrder[orderIdx - 1].testMode}
        expResults={expResults}
        setExpResults={setExpResults}
        annotations={annotations}
        goNextCallback={goNextCallback}
      />
    </div>
  );
};

export default TestShapeId;
