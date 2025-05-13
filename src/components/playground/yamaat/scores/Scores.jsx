"use client";

import { useContext, useEffect } from "react";
import classes from "./Scores.module.css";
import CategoryScores from "./CategoryScores";
import LoadingSpinner from "../../../general/LoadingSpinner";
import LuckModeScores from "./LuckMode/LuckMode";

import PlaygroundContext from "@/store/playground-ctx";

function Scores() {
  const {
    currentGame,
    loadingGame,
    currentGameState,
    updateCurrentGameState,
    yamaatGameMode,
  } = useContext(PlaygroundContext);

  useEffect(() => {
    // # Disabling the active help chance if exists
    Object.keys(currentGameState).forEach((key) => {
      if (currentGameState[key] === 2) {
        updateCurrentGameState(key, 1);
      }
    });
  }, [yamaatGameMode, currentGameState, updateCurrentGameState]);

  return yamaatGameMode === "luck" ? (
    <LuckModeScores />
  ) : (
    <div className={classes.main}>
      {currentGame.categories
        ? currentGame.categories.map((category) => {
            return (
              <CategoryScores
                key={category.id}
                categoryID={category.id}
                categoryImage={category.image}
                categoryTitle={category.title}
                inactiveScores={
                  currentGameState.categories.find(
                    (cat) => cat.id === category.id
                  ).viewed_question_points
                }
                inactiveScoresWithPositions={
                  currentGameState.categories.find(
                    (cat) => cat.id === category.id
                  ).viewed_question
                }
              />
            );
          })
        : null}

      {loadingGame ? <LoadingSpinner fullscreen /> : null}
    </div>
  );
}

export default Scores;
