import { CorrectEstimationHistory } from '@app/@types';

const countLastSuccessiveCorrectEstimation = (
  history: CorrectEstimationHistory,
) => {
  let count = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i][1]) count += 1;
  }
  return count;
};

export const judgeHasEndAnnotation = (
  history: CorrectEstimationHistory,
) => {
  const lastSuccessiveCorrectEstimation =
    countLastSuccessiveCorrectEstimation(history);
  return lastSuccessiveCorrectEstimation >= 3;
};
