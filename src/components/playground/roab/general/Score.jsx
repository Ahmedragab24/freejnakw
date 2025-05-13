import classes from "./Score.module.css";
import Link from "next/link";
import Image from "next/image";

function Score({ scorePoints, onClick, className, isAnswered }) {
  return (
    <span
      className={`${classes.main} ${classes["score" + scorePoints]} ${
        isAnswered ? classes.answered : ""
      } ${className}`}
      onClick={onClick}
    >
      <Image
        className={classes.scoreBackground}
        src="/vectors/roab-score-background.png"
        alt={scorePoints}
        width="10"
        height="10"
      />
      {scorePoints}
    </span>
  );
}

export default Score;
