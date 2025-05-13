import { useState, useRef, useEffect, useCallback } from "react";
import classes from "./Counter.module.css";
import Image from "next/image";

function Counter() {
  const timerIntervalRef = useRef(null);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    isRunning: false,
  });

  const updateTimer = useCallback(() => {
    setTimer(prev => {
      const newSeconds = prev.seconds + 1;
      if (newSeconds >= 60) {
        return {
          minutes: prev.minutes + 1,
          seconds: 0,
          isRunning: true,
        };
      }
      return {
        ...prev,
        seconds: newSeconds,
      };
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    setTimer({
      minutes: 0,
      seconds: 0,
      isRunning: true,
    });

    timerIntervalRef.current = setInterval(updateTimer, 1000);
  }, [updateTimer]);

  const handlePause = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setTimer(prev => ({ ...prev, isRunning: false }));
  }, []);

  const handleResume = useCallback(() => {
    if (!timer.isRunning) {
      setTimer(prev => ({ ...prev, isRunning: true }));
      timerIntervalRef.current = setInterval(updateTimer, 1000);
    }
  }, [timer.isRunning, updateTimer]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [startTimer]);

  return (
    <div className={classes.main}>
      <div className={classes.timer}>
        {String(timer.minutes).padStart(2, "0")}:
        {String(timer.seconds).padStart(2, "0")}
      </div>
      <div className={classes.controls}>
        {timer.isRunning ? (
          <Image
            src="/icons/pause.svg"
            alt="pause"
            width="24"
            height="24"
            onClick={handlePause}
          />
        ) : (
          <Image
            src="/icons/play.svg"
            alt="play"
            width="24"
            height="24"
            onClick={handleResume}
          />
        )}
      </div>
    </div>
  );
}

export default Counter;
