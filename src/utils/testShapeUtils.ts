import { ExpResults } from '@app/@types';
import { expSoundIds } from '@app/constants/expSounds';

export const countTested = (expResults: ExpResults) => {
  let count = 0;
  expSoundIds.forEach((esId) => {
    if (expResults[esId]?.SUGGEST) {
      count += 1;
    }
    if (expResults[esId]?.RANDOM) {
      count += 1;
    }
  });
  return count;
};
