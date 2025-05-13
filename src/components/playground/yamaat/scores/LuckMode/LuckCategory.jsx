"use client";

import { useEffect, useState, useContext } from "react";
import classes from "./LuckCategory.module.css";
import Image from "next/image";

import splitUniqueArrays from "../split-inactive-scores-array.js";
import PlaygroundContext from "@/store/playground-ctx";

function LuckCategory({ categoryID, image, title, inactiveScores }) {
  const [playedScores, setPlayedScores] = useState({
    top: [],
    bottom: [],
  });
  const { currentGame, getQuestion, setCurrentHorrorScorePositionNumber } =
    useContext(PlaygroundContext);

  useEffect(() => {
    setPlayedScores({
      top: splitUniqueArrays(inactiveScores)[0],
      bottom: splitUniqueArrays(inactiveScores)[1],
    });
  }, [inactiveScores]);

  const handleRandomScoreClick = () => {
    // 1. Make a random score from 200, 400, and 600
    const scores = [200, 400, 600];
    const score = scores[Math.floor(Math.random() * scores.length)];

    // 2. Confirm that the score has more answers in this category
    if (playedScores.top.includes(score) && playedScores.bottom.includes(score))
      return handleRandomScoreClick();

    // 3. Setting the current yamaat score position selected
    setCurrentHorrorScorePositionNumber(inactiveScores.length + 1);

    // 4. Fetching the question for the selected category score
    getQuestion(
      score,
      categoryID,
      currentGame.id,
      "top",
      inactiveScores.length + 1
    );
  };

  return (
    <div
      className={`${classes.main} ${
        inactiveScores.length >= 6 ? classes.completed : ""
      }`}
      onClick={handleRandomScoreClick}
    >
      <div className={classes.playsNumberContainer}>
        <Image
          className={classes.gameDiceImage}
          src="/icons/game-dice.svg"
          alt="game dice"
          width="36"
          height="36"
        />
        <span className={classes.playsNumber}>
          {6 - inactiveScores.length}/6
        </span>
        <Image
          className={classes.scoreImage}
          src="/vectors/playground-luck-game-card-score-background.png"
          alt="score"
          width="10"
          height="10"
        />
      </div>

      <div className={classes.imageContainer}>
        <Image
          className={classes.mainCatImage}
          src="/vectors/playground-luck-game-card-background.png"
          alt={title}
          width="10"
          height="10"
        />
        <Image
          className={classes.gameImage}
          src={image}
          alt={title}
          width="10"
          height="10"
        />
      </div>

      <h4 className={classes.title}>{title}</h4>
    </div>
  );
}

export default LuckCategory;
