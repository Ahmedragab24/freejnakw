"use client";

import classes from "./ScoreCard.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Score({ scorePoints, className }) {
  const router = useRouter();

  return (
    <span className={`${classes.main} ${className}`}>
      {scorePoints === "200" ? (
        <Image src="/vectors/roab-200-score.svg" alt="200 score" fill />
      ) : null}
      {scorePoints === "400" ? (
        <Image src="/vectors/roab-400-score.svg" alt="400 score" fill />
      ) : null}
      {scorePoints === "600" ? (
        <Image src="/vectors/roab-600-score.svg" alt="600 score" fill />
      ) : null}
    </span>
  );
}

export default Score;
