import { CorrectEstimationHistory } from '@app/@types';
import { repSoundIds } from '@app/constants/repSounds';

const countLastSuccessiveCorrectEstimation = (
  history: CorrectEstimationHistory,
) => {
  let count = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i][1] !== 'CORRECT') return count;
    count += 1;
  }
  return count;
};

export const judgeHasEndAnnotation = (
  history: CorrectEstimationHistory,
) => {
  const lastSuccessiveCorrectEstimation =
    countLastSuccessiveCorrectEstimation(history);
  return (
    lastSuccessiveCorrectEstimation >= 3 ||
    history.length === repSoundIds.length - 3
  );
};
