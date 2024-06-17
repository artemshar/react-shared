import { useState, useEffect, useCallback } from "react";

const useTimer = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    // Optionally reset seconds to initial value
    setSeconds(initialSeconds);
  }, []);

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          } else {
            clearInterval(interval!);
            setIsActive(false);
            return 0; // Ensure the timer stops at 0
          }
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  return { seconds, startTimer, stopTimer, pauseTimer };
};

export default useTimer;
