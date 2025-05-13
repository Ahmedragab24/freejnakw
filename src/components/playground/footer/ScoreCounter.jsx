import { useState, useEffect } from "react";
import classes from "./ScoreCounter.module.css";
import Image from "next/image";

function ScoreCounter({ score, onChange }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(score);
  }, [score]);

  const handleChangeCount = (e) => {
    const factor = e.target.dataset.factor;
    let newCount = count;

    if (factor === "inc") {
      newCount += 100;
    } else {
      if (count === 0) return;
      newCount -= 100;
    }

    setCount(newCount);
    onChange(newCount);
  };

  return (
    <div className={classes.main}>
      <Image
        className={classes.decBtn}
        src="/icons/game-minus.svg"
        alt="decrement score"
        width="60"
        height="60"
        data-factor="dec"
        onClick={handleChangeCount}
      />
      <span className={classes.score}>{count}</span>
      <Image
        className={classes.incBtn}
        src="/icons/game-plus.svg"
        alt="increment score"
        width="60"
        height="60"
        data-factor="inc"
        onClick={handleChangeCount}
      />
    </div>
  );
}

export default ScoreCounter;
