import React, { useState, useEffect, useRef, MouseEventHandler } from 'react';

interface Props {}

export const Stopwatch: React.FC<Props> = () => {
  const [sec, setSec] = useState<number>(0);
  const stopwatchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart: MouseEventHandler<HTMLButtonElement> = () => {

    if (!stopwatchRef.current) { // Skip actions, if timerRef is already have
			// Assigning a setInterval
      stopwatchRef.current = setInterval(() => {
        setSec((prevSec) => prevSec + 1);
      }, 1000);
    }
  };

  const handlePause: MouseEventHandler<HTMLButtonElement> = () => {
    if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;
    }
  };

  const handleStop: MouseEventHandler<HTMLButtonElement> = () => {
    if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;
    }
    setSec(0);
  };

  useEffect(() => {
    return () => {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>{sec}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};
