import classes from "./TeamControls.module.css";
import Image from "next/image";

function TeamControls({ name, score }) {
  return (
    <div className={classes.main}>
      <div className={classes.nameAndScore}>
        <h1
          className={`${classes.name} ${
            name.length > 10 ? classes.limitExc : ""
          }`}
        >
          {name}
        </h1>
        <div className={classes.scoreContainer}>{score}</div>
      </div>
    </div>
  );
}

export default TeamControls;
