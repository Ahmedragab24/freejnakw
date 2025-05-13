"use client";

import { useContext } from "react";
import classes from "./Footer.module.css";
import TeamControls from "./TeamControls";
import Ads from "./Ads";

import PlaygroundContext from "@/store/playground-ctx";

function Footer({ gameMode }) {
  const {
    currentGame,
    currentGameState,
    updateCurrentGameState,
    loadingGame,
    yamaatGameMode,
    getQuestion,
    playingPlayer,
  } = useContext(PlaygroundContext);

  const handleStartVertebraeQuestion = (playerStarting, score) => {
    if (playerStarting !== playingPlayer) return;

    getQuestion(
      score,
      2,
      currentGame.id,
      playingPlayer === "first_player" ? "top" : "bottom"
    );
  };

  return (
    <footer
      className={`${classes.main} ${
        yamaatGameMode === "vertebrae" ? classes.vertebraeMode : ""
      }`}
    >
      <TeamControls
        gameMode={gameMode}
        teamName={!loadingGame ? currentGame.first_player.name : ""}
        // * Score
        teamScore={currentGameState.first_player_points}
        onScoreChange={(newScore) => {
          updateCurrentGameState("first_player_points", newScore);
        }}
        // * Help Chances
        availableChances={{
          aljleeb: currentGameState.first_player_al_jleeb,
          vertebrae_one: currentGameState.first_player_vertebrae_one,
          vertebrae_two: currentGameState.first_player_vertebrae_two,
        }}
        onAljleebHelpClick={updateCurrentGameState.bind(
          this,
          "first_player_al_jleeb",
          2
        )}
        // * Vertebrae Chances
        onVertebraeOneClick={handleStartVertebraeQuestion.bind(
          this,
          "first_player",
          400
        )}
        onVertebraeTwoClick={handleStartVertebraeQuestion.bind(
          this,
          "first_player",
          600
        )}
      />
      <Ads gameMode={gameMode} />
      <TeamControls
        gameMode={gameMode}
        teamName={!loadingGame ? currentGame.second_player.name : ""}
        // * Score
        teamScore={currentGameState.second_player_points}
        onScoreChange={(newScore) => {
          updateCurrentGameState("second_player_points", newScore);
        }}
        // * Help Chances
        availableChances={{
          aljleeb: currentGameState.second_player_al_jleeb,
          vertebrae_one: currentGameState.second_player_vertebrae_one,
          vertebrae_two: currentGameState.second_player_vertebrae_two,
        }}
        onAljleebHelpClick={updateCurrentGameState.bind(
          this,
          "second_player_al_jleeb",
          2
        )}
        // * Vertebrae Chances
        onVertebraeOneClick={handleStartVertebraeQuestion.bind(
          this,
          "second_player",
          400
        )}
        onVertebraeTwoClick={handleStartVertebraeQuestion.bind(
          this,
          "second_player",
          600
        )}
      />
    </footer>
  );
}

export default Footer;
