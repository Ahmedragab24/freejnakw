"use client";

import { useContext } from "react";
import classes from "./Sidebar.module.css";
import TeamControls from "./TeamControls";
import Ads from "./Ads";

import PlaygroundContext from "@/store/playground-ctx";

function Sidebar() {
  const { currentGame, currentGameState, loadingGame } =
    useContext(PlaygroundContext);

  return (
    <aside className={classes.main}>
      <TeamControls
        name={!loadingGame ? currentGame.first_player.name : ""}
        score={currentGameState.first_player_points}
      />
      <Ads />
      <TeamControls
        name={!loadingGame ? currentGame.second_player.name : ""}
        score={currentGameState.second_player_points}
      />
    </aside>
  );
}

export default Sidebar;
