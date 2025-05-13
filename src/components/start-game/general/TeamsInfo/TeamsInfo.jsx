import classes from "./TeamsInfo.module.css";
import Image from "next/image";
import Form from "./Form";

function TeamsInfo({ gameMode, onSubmit }) {
  return (
    <div
      className={classes.main}
      id={gameMode === "roab" ? "start-game-roab-form-section" : ""}
    >
      <h2
        className={`${classes.title} ${
          gameMode === "roab" ? classes.roabMode : ""
        }`}
      >
        حدد معلومات الفرق
      </h2>

      <div className={classes.logo}>
        <Image src="/icons/logo.svg" alt="logo" fill />
      </div>

      <Form gameMode={gameMode} onSubmit={onSubmit} />
    </div>
  );
}

export default TeamsInfo;
