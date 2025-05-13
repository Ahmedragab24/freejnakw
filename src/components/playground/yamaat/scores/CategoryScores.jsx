import { useEffect, useState, useContext } from "react";
import classes from "./CategoryScores.module.css";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import Score from "../general/Score";

import splitUniqueArrays from "./split-inactive-scores-array.js";
import PlaygroundContext from "@/store/playground-ctx";

function CategoryScores({
  categoryID,
  categoryImage,
  categoryTitle,
  inactiveScores,
  inactiveScoresWithPositions,
}) {
  const [playedScores, setPlayedScores] = useState({
    top: [],
    bottom: [],
  });
  const { currentGame, getQuestion, setCurrentYamaatScorePosition } =
    useContext(PlaygroundContext);

  useEffect(() => {
    const playedSc = {
      top: inactiveScoresWithPositions.filter(
        (score) => score.postion === "top"
      ),
      bottom: inactiveScoresWithPositions.filter(
        (score) => score.postion === "bottom"
      ),
    };

    setPlayedScores(playedSc);
  }, [inactiveScoresWithPositions]);

  const handleScoreClick = (score, scorePosition) => {
    // >> Setting the current yamaat score position selected
    setCurrentYamaatScorePosition(scorePosition);

    // >> Fetching the question for the selected category score
    getQuestion(score, categoryID, currentGame.id, scorePosition);
  };

  return (
    <div className={classes.main}>
      <div className={`${classes.scoresRow} ${classes.top}`}>
        {[200, 400, 600].map((score) => {
          return (
            <Score
              key={score}
              href="/yamaat-playground/game"
              isAnswered={playedScores.top.some((sc) => sc.points === score)}
              categoryID={categoryID}
              onClick={handleScoreClick.bind(this, score, "top")}
            >
              {score}
            </Score>
          );
        })}
      </div>
      <CategoryCard image={categoryImage} title={categoryTitle} />
      <div className={`${classes.scoresRow} ${classes.bottom}`}>
        {[200, 400, 600].map((score) => {
          return (
            <Score
              key={score}
              href="/yamaat-playground/game"
              isAnswered={playedScores.bottom.some((sc) => sc.points === score)}
              categoryID={categoryID}
              onClick={handleScoreClick.bind(this, score, "bottom")}
            >
              {score}
            </Score>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryScores;
