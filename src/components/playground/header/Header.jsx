"use client";

import { useContext } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Action from "./Action";
import LoadingSpinner from "../../general/LoadingSpinner";

import PlaygroundContext from "@/store/playground-ctx";

function Header({ gameMode }) {
  const { currentGame, loadingGame } = useContext(PlaygroundContext);

  return (
    <header
      className={`${classes.main} ${
        gameMode === "roab" ? classes.roabMode : ""
      }`}
    >
      <span className={classes.logoLink}>
        <Image
          src={`/icons/logo${gameMode === "yamaat" ? "-colored" : ""}.svg`}
          alt="logo"
          width="79"
          height="60"
        />
      </span>

      {!loadingGame ? (
        <div
          className={`${classes.gameName} ${
            currentGame.name.length > 10 ? classes.limitExc : ""
          }`}
          title={currentGame.name}
        >
          {currentGame.name}
        </div>
      ) : null}

      <Action gameMode={gameMode} currentGame={currentGame} />
    </header>
  );
}

export default Header;
