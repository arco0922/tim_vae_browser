import * as React from 'react';

export const useTimer = () => {
  const [minutes, setMinutes] = React.useState<number>(0);
  const [seconds, setSeconds] = React.useState<number>(0);

  const [isRunning, setIsRunning] =
    React.useState<boolean>(false);

  const [endCallback, setEndCallback] = React.useState<
    (() => void) | undefined
  >(undefined);

  const startTimer = React.useCallback(
    (duration: number, endCallback: () => void) => {
      setMinutes(Math.floor(duration / 60));
      setSeconds(duration - Math.floor(duration / 60) * 60);
      setIsRunning(true);
      setEndCallback(() => endCallback);
    },
    [],
  );

  const resumeTimer = React.useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopTimer = React.useCallback(() => {
    setIsRunning(false);
  }, []);

  const finishTimer = React.useCallback(() => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    if (endCallback !== undefined) {
      endCallback();
    }
  }, [endCallback]);

  React.useEffect(() => {
    if (!isRunning) return;
    if (
      minutes === 0 &&
      seconds === 0 &&
      endCallback !== undefined
    ) {
      endCallback();
    }
    const sampleInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  }, [isRunning, minutes, seconds, endCallback]);

  return {
    minutes,
    seconds,
    startTimer,
    resumeTimer,
    stopTimer,
    finishTimer,
  };
};
