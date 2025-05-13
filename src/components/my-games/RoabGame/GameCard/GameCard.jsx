"use client";

import { useState } from "react";
import classes from "./GameCard.module.css";
import Image from "next/image";

import ScoreCard from "./ScoreCard";
import ResumeConfirm from "../../general/ResumeConfirm";
import TeamsInfoPrompt from "../../general/TeamsInfoPrompt/TeamsInfoPrompt";

function GameCard({
  gameID,
  playingTimes,
  gameName,
  gameMode,
  gameCategories,
  onResumeGame,
  onRestartGame,
}) {
  const [isResumePromptShown, setIsResumePromptShown] = useState(false);
  const [isTeamsInfoPromptShown, setIsTeamsInfoPromptShown] = useState(false);

  const handleToggleResumePrompt = () => {
    setIsResumePromptShown((prev) => !prev);
  };

  const handleToggleTeamsInfoPrompt = () => {
    setIsResumePromptShown(false);
    setIsTeamsInfoPromptShown((prev) => !prev);
  };

  const handleRestartHorrorGame = (teamsData) => {
    const allData = { ...teamsData, gameID };

    onRestartGame(allData, "horror");
  };

  return (
    <div
      className={`${classes.main} ${
        isResumePromptShown || isTeamsInfoPromptShown ? classes.promptState : ""
      }`}
    >
      <div className={classes.numOfPlays}>عدد مرات اللعب : {playingTimes}</div>
      <h2 className={classes.gameName}>لعبة {gameName}</h2>
      <div className={classes.playBtnContainer}>
        {/* <Image
          src="/vectors/title-line.svg"
          alt="title line"
          width="1000"
          height="36"
        /> */}
        <button
          type="button"
          className={classes.playBtn}
          onClick={handleToggleResumePrompt}
        >
          العب
        </button>
        {/* <Image
          src="/vectors/title-line.svg"
          alt="title line"
          width="1000"
          height="36"
        /> */}
      </div>

      <div className={classes.categoriesContainer}>
        <div className={classes.column}>
          <ScoreCard scorePoints="200" />
          <ScoreCard scorePoints="200" />
          <ScoreCard scorePoints="200" />
          <ScoreCard scorePoints="200" />
        </div>
        <div className={classes.column}>
          <ScoreCard scorePoints="400" />
          <ScoreCard scorePoints="400" />
          <ScoreCard scorePoints="400" />
          <ScoreCard scorePoints="400" />
        </div>
        <div className={classes.column}>
          <ScoreCard scorePoints="600" />
          <ScoreCard scorePoints="600" />
          <ScoreCard scorePoints="600" />
          <ScoreCard scorePoints="600" />
        </div>
      </div>

      <Image
        className={classes.vector1}
        src="/vectors/ferjan-2.1.svg"
        alt={gameName}
        width="230"
        height="230"
      />
      <Image
        className={classes.vector2}
        src="/vectors/ferjan-2.2.svg"
        alt={gameName}
        width="200"
        height="200"
      />
      <Image
        className={classes.vector3}
        src="/vectors/ferjan-2.3.svg"
        alt={gameName}
        width="300"
        height="330"
      />
      <Image
        className={classes.vector4}
        src="/vectors/ferjan-2.4.svg"
        alt={gameName}
        width="300"
        height="330"
      />

      <ResumeConfirm
        show={isResumePromptShown}
        onClosePrompt={handleToggleResumePrompt}
        onResumeClick={onResumeGame}
        onStartNewClick={handleToggleTeamsInfoPrompt}
      />
      <TeamsInfoPrompt
        show={isTeamsInfoPromptShown}
        onClosePrompt={handleToggleTeamsInfoPrompt}
        onSubmitTeamsInfo={handleRestartHorrorGame}
      />
    </div>
  );
}

export default GameCard;
