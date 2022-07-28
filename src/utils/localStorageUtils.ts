import { localStorageKeys } from '@app/constants/localStorageKeys';

export const deleteDemoStorages = () => {
  localStorage.removeItem(localStorageKeys.ANNOTATIONS);
  localStorage.removeItem(
    localStorageKeys.CORRECT_ESTIMATION_HISTORY,
  );
};

export const deleteExpStorages = () => {
  localStorage.removeItem(localStorageKeys.EXP_ANNOTATIONS);
  localStorage.removeItem(
    localStorageKeys.EXP_CORRECT_ESTIMATION_HISTORY,
  );
  localStorage.removeItem(localStorageKeys.EXP_ORDER);
  localStorage.removeItem(localStorageKeys.EXP_RESULTS);
  localStorage.removeItem(localStorageKeys.EXP_TIMESTAMPS);
};
