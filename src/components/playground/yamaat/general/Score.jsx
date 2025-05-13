"use client";

import classes from "./Score.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Score({ children, href, className, isAnswered, categoryID, onClick }) {
  const router = useRouter();

  return (
    <span
      className={`${classes.main} ${
        isAnswered ? classes.answered : ""
      } ${className}`}
      style={{ cursor: href ? "pointer" : "initial" }}
      onClick={onClick}
    >
      <span>{children}</span>
      <Image
        className={classes.background}
        src="/vectors/score-background.png"
        alt="score background"
        width="10"
        height="10"
      />
    </span>
  );
}

export default Score;
