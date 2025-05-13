import classes from "./VertebraeScore.module.css";
import Image from "next/image";

function VertebraeScore({ isUsed, score, onClick }) {
  return (
    <span
      className={`${classes.main} ${isUsed ? classes.used : ""}`}
      onClick={onClick}
    >
      <Image
        className={classes.background}
        src={`/vectors/playground-vertebrae-${score}.png`}
        alt="vertebrae score background"
        width="10"
        height="10"
      />
      {score}
    </span>
  );
}

export default VertebraeScore;
