"use client";

import { useContext } from "react";
import classes from "./LuckMode.module.css";
import LuckCategory from "./LuckCategory";

import PlaygroundContext from "@/store/playground-ctx";

function LuckMode() {
  const { currentGame, currentGameState } = useContext(PlaygroundContext);

  return (
    <div className={classes.main}>
      {currentGame.categories
        ? currentGame.categories.map((category) => {
            return (
              <LuckCategory
                key={category.id}
                categoryID={category.id}
                image={category.image}
                title={category.title}
                inactiveScores={
                  currentGameState.categories.find(
                    (cat) => cat.id === category.id
                  ).viewed_question_points
                }
              />
            );
          })
        : null}
    </div>
  );
}

export default LuckMode;
