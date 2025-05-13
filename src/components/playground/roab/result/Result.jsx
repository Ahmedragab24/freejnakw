"use client";

import { useContext } from "react";
import classes from "./Result.module.css";
import Link from "next/link";
import Image from "next/image";

import PlaygroundContext from "@/store/playground-ctx";

function Result() {
  const { currentGame, currentGameState } = useContext(PlaygroundContext);

  return (
    <section
      className={`${classes.main} ${
        currentGameState.first_player_points ===
        currentGameState.second_player_points
          ? classes.draw
          : ""
      }`}
    >
      {currentGameState.first_player_points ===
      currentGameState.second_player_points ? (
        <h1 className={classes.title}>التعادل عادل</h1>
      ) : (
        <h1 className={classes.title}>مبروك الفوز</h1>
      )}

      {currentGameState.first_player_points ===
      currentGameState.second_player_points ? (
        <p className={classes.winnerTeam}>للفريقين</p>
      ) : null}

      {currentGameState.first_player_points >
      currentGameState.second_player_points ? (
        <p
          className={`${classes.winnerTeam} ${
            currentGame.first_player.name.length > 10 ? classes.limitExc : ""
          }`}
        >
          {currentGame.first_player && currentGame.first_player.name}
        </p>
      ) : null}

      {currentGameState.first_player_points <
      currentGameState.second_player_points ? (
        <p
          className={`${classes.winnerTeam} ${
            currentGame.second_player.name.length > 10 ? classes.limitExc : ""
          }`}
        >
          {currentGame.first_player && currentGame.second_player.name}
        </p>
      ) : null}

      <div className={classes.teamsScoresContainer}>
        <div className={classes.team1ScoreContainer}>
          <span
            className={`${classes.teamName} ${
              currentGame.first_player
                ? currentGame.first_player.name.length > 10
                  ? classes.limitExc
                  : ""
                : ""
            }`}
          >
            {currentGame.first_player && currentGame.first_player.name}
          </span>
          <span className={classes.teamScore}>
            {currentGameState.first_player_points}
          </span>
        </div>
        <div className={classes.team2ScoreContainer}>
          <span
            className={`${classes.teamName} ${
              currentGame.second_player
                ? currentGame.second_player.name.length > 10
                  ? classes.limitExc
                  : ""
                : ""
            }`}
          >
            {currentGame.first_player && currentGame.second_player.name}
          </span>
          <span className={classes.teamScore}>
            {currentGameState.second_player_points}
          </span>
        </div>
      </div>

      {currentGameState.first_player_points ===
      currentGameState.second_player_points ? (
        <Image
          className={classes.drawVector}
          src="/vectors/draw.gif"
          alt="تعادل"
          width="290"
          height="164"
        />
      ) : (
        <Image
          className={classes.winnerVector}
          src="/vectors/the-first-winner-roab.gif"
          alt="الفائز"
          width="600"
          height="430"
        />
      )}

      <Link href="/start-game" className={classes.replayBtn}>
        العب مرة اخرى
      </Link>
    </section>
  );
}

export default Result;
