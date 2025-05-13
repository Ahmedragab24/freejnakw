"use client";

import { useContext } from "react";
import classes from "./WhoAnswered.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PlaygroundContext from "@/store/playground-ctx";

function WhoAnswered() {
  const router = useRouter();

  const {
    currentGame,
    currentQuestion,
    currentGameState,
    updateCurrentGameState,
    loadingGame,
    storeQuestionView,
    turnPlayer,
    currentHorrorScorePositionNumber,
  } = useContext(PlaygroundContext);

  const handleChooseWinner = (e) => {
    const curGameState = { ...currentGameState };

    // 1. Adding the current score to the viewed question points of its category
    const currentGameCategories = [...currentGameState.categories];
    currentGameCategories[0].viewed_question_points.push(
      currentQuestion.points
    );
    currentGameCategories[0].viewed_question.push({
      points: currentQuestion.points,
      postion: "top",
      numper: currentHorrorScorePositionNumber,
    });

    updateCurrentGameState("categories", currentGameCategories);

    // 2. Getting the winner team and add the score to him
    const winnerID = e.target.dataset.playerid;
    if (winnerID == 1) {
      updateCurrentGameState(
        "first_player_points",
        curGameState.first_player_points + currentQuestion.points
      );
    } else if (winnerID == 2) {
      updateCurrentGameState(
        "second_player_points",
        curGameState.second_player_points + currentQuestion.points
      );
    }

    // 3. Calculate the total answered questions
    const totalAnsweredQuestions = curGameState.categories[0].length;

    // 4. Mark the current question as ended in the backend
    storeQuestionView();

    // 5. Turn player
    turnPlayer();

    // 6. If all questions are answered, redirect to result page
    if (totalAnsweredQuestions === 24) {
      router.push("/roab-playground/result");
    } else {
      router.push("/roab-playground");
    }
  };

  return (
    <section className={classes.main}>
      <div className={classes.whoAnsedContainer}>
        <p className={classes.whoAnsedText}>منو جاوب هذا السؤال؟</p>
        <div className={classes.whoAnsedOptions}>
          <div className={classes.team1Or2Btns}>
            <button
              type="button"
              className={`${classes.team1Btn} ${
                !loadingGame
                  ? currentGame.first_player.name.length > 10
                    ? classes.limitExc
                    : ""
                  : ""
              }`}
              data-playerid="1"
              onClick={handleChooseWinner}
            >
              {!loadingGame ? currentGame.first_player.name : ""}
            </button>
            <button
              type="button"
              className={`${classes.team2Btn} ${
                !loadingGame
                  ? currentGame.second_player.name.length > 10
                    ? classes.limitExc
                    : ""
                  : ""
              }`}
              data-playerid="2"
              onClick={handleChooseWinner}
            >
              {!loadingGame ? currentGame.second_player.name : ""}
            </button>
          </div>
          <button
            type="button"
            className={classes.noOneBtn}
            data-playerid="0"
            onClick={handleChooseWinner}
          >
            ولا أحد
          </button>
        </div>

        {/* = = = = = = = Absolutely Positioned Elements = = = = = = =  */}
        <Link
          href="/roab-playground/game/answer"
          className={classes.returnToAnswer}
        >
          الرجوع للجواب
        </Link>
      </div>
    </section>
  );
}

export default WhoAnswered;
