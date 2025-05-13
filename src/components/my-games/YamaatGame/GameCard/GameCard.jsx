"use client";

import { useState } from "react";
import classes from "./GameCard.module.css";
import Image from "next/image";

import CatCard from "./CatCard";
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

  const handlerestartGame = (teamsData) => {
    const allData = { ...teamsData, gameID };
    onRestartGame(allData, "yamaat");
  };

  return (
    <div
      className={`${classes.main} ${
        gameMode === "luck" ? classes.luckMode : ""
      } ${gameMode === "vertebrae" ? classes.sectionsMode : ""}`}
    >
      <div className={classes.numOfPlays}>عدد مرات اللعب : {playingTimes}</div>
      <h2 className={classes.gameName}>لعبة {gameName}</h2>
      <div className={classes.playBtnContainer}>
        {/* <Image
          src="/vectors/card-title-line-right.svg"
          alt="title line"
          width="210"
          height="36"
        /> */}
        <button
          type="button"
          className={classes.playBtn}
          onClick={handleToggleResumePrompt}
        >
          {gameMode === "luck" ? (
            <Image
              src="/icons/game-dice.svg"
              alt="game dice"
              width="40"
              height="40"
            />
          ) : (
            ""
          )}
          &nbsp;
          {gameMode === "luck"
            ? "أنت وحظك"
            : gameMode === "vertebrae"
            ? "الفقرات"
            : "العب"}
        </button>
        {/* <Image
          src="/vectors/card-title-line-left.svg"
          alt="title line"
          width="210"
          height="36"
        /> */}
      </div>

      <div className={classes.categoriesContainer}>
        {gameCategories.map((category) => {
          return (
            <CatCard
              key={category.id}
              image={category.image}
              title={category.title}
            />
          );
        })}
      </div>

      <ResumeConfirm
        show={isResumePromptShown}
        onClosePrompt={handleToggleResumePrompt}
        onResumeClick={onResumeGame}
        onStartNewClick={handleToggleTeamsInfoPrompt}
      />
      <TeamsInfoPrompt
        show={isTeamsInfoPromptShown}
        onClosePrompt={handleToggleTeamsInfoPrompt}
        onSubmitTeamsInfo={handlerestartGame}
      />
    </div>
  );
}

export default GameCard;
