"use client";

import { useContext } from "react";
import classes from "./RoabGame.module.css";
import TeamsInfo from "../general/TeamsInfo/TeamsInfo";

import StartGameContext from "@/store/start-game-ctx";

function RoabGame({ show }) {
  const { startGame } = useContext(StartGameContext);

  const handleStartGame = (teamsData) => {
    const data = { teamsData };

    startGame(data, "horror");
  };

  return (
    <section className={`${classes.main} ${show ? classes.show : ""}`}>
      <p className={classes.description}>
        24 مشهد مرعب مع سؤال لكل مشهد، اللعبة تحتاج تركيز عالي جداً و عدم الخوف
      </p>

      <TeamsInfo
        gameMode="roab"
        playgroundUrl="/yamaat-playground"
        onSubmit={handleStartGame}
      />
    </section>
  );
}

export default RoabGame;
