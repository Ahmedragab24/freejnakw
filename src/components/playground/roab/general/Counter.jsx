import { useState, useRef, useEffect } from "react";
import classes from "./Counter.module.css";
import Image from "next/image";

function Counter() {
  const timerIntervalRef = useRef(0);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    isRunning: false,
  });

  useEffect(() => {
    handleStartCount();
  }, []);

  const handleStartCount = () => {
    const newTimer = {
      minutes: 0,
      seconds: 0,
      isRunning: true,
    };

    // 1. Resetting the timer
    setTimer(newTimer);

    // 2. Clearing the interval
    clearInterval(timerIntervalRef.current);

    // 3. Starting the timer to increase every second automatically
    timerIntervalRef.current = setInterval(() => {
      newTimer.seconds += 1;

      if (newTimer.seconds >= 60) {
        newTimer.minutes += 1;
        newTimer.seconds = 0;
      }

      // 4. Updating the UI
      setTimer({
        ...newTimer,
      });
    }, 1000);
  };

  const handlePause = () => {
    if (timer.isRunning) {
      clearInterval(timerIntervalRef.current);
      setTimer((prev) => ({
        ...prev,
        isRunning: false,
      }));
    } else {
      handleResume();
    }
  };

  const handleResume = () => {
    const newTimer = {
      ...timer,
      isRunning: true,
    };

    // 1. Starting the timer to increase every second automatically
    timerIntervalRef.current = setInterval(() => {
      newTimer.seconds += 1;

      if (newTimer.seconds >= 60) {
        newTimer.minutes += 1;
        newTimer.seconds = 0;
      }

      // 2. Updating the UI
      setTimer({
        ...newTimer,
      });
    }, 1000);
  };

  return (
    <div className={classes.main}>
      <span className={classes.action}>
        <Image
          className={classes.recountBtn}
          src="/icons/recount.svg"
          alt="replay timer"
          width="30"
          height="27"
          title="إعادة الضبط"
          onClick={handleStartCount}
        />
        <Image
          className={classes.pauseBtn}
          src={`/icons/${timer.isRunning ? "pause" : "resume"}.svg`}
          alt="pause"
          width="24"
          height="29"
          title="إيقاف مؤقتا"
          onClick={handlePause}
        />
      </span>

      <span className={classes.timer}>
        <span className={classes.seconds}>
          {String(timer.seconds).padStart(2, "0")}
        </span>
        <Image src="/icons/double-dot.svg" alt="dots" width="6" height="20" />
        <span className={classes.minutes}>
          {String(timer.minutes).padStart(2, "0")}
        </span>
      </span>
    </div>
  );
}

export default Counter;
