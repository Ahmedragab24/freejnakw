"use client";

import { useState } from "react";
import classes from "./Counter.module.css";
import Image from "next/image";

function Counter({ onChange }) {
  const [count, setCount] = useState(1);

  const handleChangeCount = (e) => {
    const factor = e.target.dataset.factor;
    let newCount = count;

    if (factor === "inc") {
      newCount += 1;
    } else {
      if (count === 1) return;
      newCount -= 1;
    }

    setCount(newCount);
    onChange(newCount);
  };

  return (
    <div className={classes.main}>
      <Image
        className={classes.decrement}
        src="/icons/game-minus.svg"
        alt="decrement"
        width="64"
        height="64"
        data-factor="dec"
        onClick={handleChangeCount}
      />
      <span className={classes.number}>{count}</span>
      <Image
        className={classes.increment}
        src="/icons/game-plus.svg"
        alt="increment"
        width="64"
        height="64"
        data-factor="inc"
        onClick={handleChangeCount}
      />
    </div>
  );
}

export default Counter;
