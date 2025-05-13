"use client";

import { useContext } from "react";
import classes from "./Sidebar.module.css";
import TeamControls from "./TeamControls";
import Ads from "./Ads";

import PlaygroundContext from "@/store/playground-ctx";

function Sidebar() {
  const { currentGame, currentGameState, updateCurrentGameState, loadingGame } =
    useContext(PlaygroundContext);

  return (
    <aside className={classes.main}>
      <TeamControls
        teamName={!loadingGame ? currentGame.first_player.name : ""}
        teamScore={currentGameState.first_player_points}
        availableChances={{
          aljleeb: currentGameState.first_player_al_jleeb,
          towAnswer: currentGameState.first_player_tow_answer,
          noAnswer: currentGameState.first_player_no_answer,
        }}
        onHelpChanceClick={(helpChance) => {
          updateCurrentGameState("first_player_" + helpChance, 2);
        }}
      />
      <Ads />
      <TeamControls
        teamName={!loadingGame ? currentGame.second_player.name : ""}
        teamScore={currentGameState.second_player_points}
        availableChances={{
          aljleeb: currentGameState.second_player_al_jleeb,
          towAnswer: currentGameState.second_player_tow_answer,
          noAnswer: currentGameState.second_player_no_answer,
        }}
        onHelpChanceClick={(helpChance) => {
          updateCurrentGameState("second_player_" + helpChance, 2);
        }}
      />
    </aside>
  );
}

export default Sidebar;
