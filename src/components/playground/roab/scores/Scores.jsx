"use client";

import { useEffect, useState, useRef, useContext } from "react";
import classes from "./Scores.module.css";
import Image from "next/image";

import Score from "../general/Score";
import ClickOutsideWrapper from "../../../general/ClickOutsideWrapper";
import LoadingSpinner from "../../../general/LoadingSpinner";

import PlaygroundContext from "@/store/playground-ctx";

function Scores() {
  const {
    currentGame,
    loadingGame,
    currentGameState,
    getQuestion,
    setCurrentHorrorScorePositionNumber,
  } = useContext(PlaygroundContext);

  const handleScoreClick = (score, scorePositionNumber) => {
    // >> Fetching the question for the selected category score
    getQuestion(score, 1, currentGame.id, "top", scorePositionNumber);
    setCurrentHorrorScorePositionNumber(scorePositionNumber);
  };

  const handleCheckIfScoreAnswered = (score, scorePosition) => {
    if (currentGameState.categories[0].viewed_question.length === 0)
      return false;

    const isScoreAnswered = currentGameState.categories[0].viewed_question.some(
      (s) => s.points == score && s.numper == scorePosition
    );

    return isScoreAnswered;
  };

  return (
    <div className={classes.main}>
      <div className={classes.categorySet}>
        <div className={classes.catHeadContainer}>
          <Image
            className={classes.mainBackgroundBorder}
            src="/vectors/roab-playground-game-number-200-border.png"
            alt="200 score"
            width="100"
            height="100"
          />
          <span className={classes.cat200Head}>200</span>
          <Image
            className={classes.cat200Vector1}
            src="/vectors/roab-playground-1.svg"
            alt="background vector"
            width="300"
            height="374"
          />
          <Image
            className={classes.cat200Vector2}
            src="/vectors/roab-playground-5.svg"
            alt="background vector"
            width="248"
            height="318"
          />
        </div>
        <div className={classes.scoreColumnsContainer}>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "200", 1)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 1)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 2)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 2)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 3)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 3)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 4)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 4)}
            />
          </div>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "200", 5)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 5)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 6)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 6)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 7)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 7)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "200", 8)}
              scorePoints="200"
              isAnswered={handleCheckIfScoreAnswered(200, 8)}
            />
          </div>
        </div>
      </div>
      <div className={classes.categorySet}>
        <div className={classes.catHeadContainer}>
          <Image
            className={classes.mainBackgroundBorder}
            src="/vectors/roab-playground-game-number-400-border.png"
            alt="200 score"
            width="100"
            height="100"
          />
          <span className={classes.cat400Head}>400</span>
          <Image
            className={classes.cat400Vector1}
            src="/vectors/roab-playground-4.svg"
            alt="background vector"
            width="248"
            height="318"
          />
          <Image
            className={classes.cat400Vector2}
            src="/vectors/roab-playground-3.svg"
            alt="background vector"
            width="500"
            height="600"
          />
        </div>
        <div className={classes.scoreColumnsContainer}>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "400", 1)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 1)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 2)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 2)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 3)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 3)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 4)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 4)}
            />
          </div>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "400", 5)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 5)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 6)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 6)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 7)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 7)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "400", 8)}
              scorePoints="400"
              isAnswered={handleCheckIfScoreAnswered(400, 8)}
            />
          </div>
        </div>
      </div>
      <div className={classes.categorySet}>
        <div className={classes.catHeadContainer}>
          <Image
            className={classes.mainBackgroundBorder}
            src="/vectors/roab-playground-game-number-600-border.png"
            alt="200 score"
            width="100"
            height="100"
          />
          <span className={classes.cat600Head}>600</span>
          <Image
            className={classes.cat600Vector1}
            src="/vectors/roab-playground-2.svg"
            alt="background vector"
            width="150"
            height="144"
          />
        </div>
        <div className={classes.scoreColumnsContainer}>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "600", 1)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 1)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 2)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 2)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 3)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 3)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 4)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 4)}
            />
          </div>
          <div className={classes.scoreColumn}>
            <Score
              onClick={handleScoreClick.bind(this, "600", 5)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 5)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 6)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 6)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 7)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 7)}
            />
            <Score
              onClick={handleScoreClick.bind(this, "600", 8)}
              scorePoints="600"
              isAnswered={handleCheckIfScoreAnswered(600, 8)}
            />
          </div>
        </div>
      </div>

      {loadingGame ? <LoadingSpinner fullscreen /> : null}
    </div>
  );
}

export default Scores;
