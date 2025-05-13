"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import classes from "./StartGame.module.css";
import Image from "next/image";

import Hero from "../general/GameHero";
import Ferjan from "./Ferjan/Ferjan";
import YamaatGame from "./YamaatGame/YamaatGame";
import RoabGame from "./RoabGame/RoabGame";

function Game() {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState("");
  // * For making the scrolling behavior
  const [isGameCardClicked, setIsGameCardClicked] = useState(false);

  useEffect(() => {
    // ** Scrolling to the game section
    var gameElement;

    if (currentGame === "yamaat") {
      gameElement = document.getElementById(
        "start-game-yamaat-categories-section"
      );
    } else if (currentGame === "roab") {
      gameElement = document.getElementById("start-game-roab-form-section");
    }

    if (gameElement) {
      gameElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isGameCardClicked, currentGame]);

  const handleChangeGame = (gameName) => {
    setCurrentGame(gameName);
    // * For making the scrolling behavior
    setIsGameCardClicked((prev) => !prev);
  };

  return (
    <>
      <Hero currentGame={currentGame} />
      <Ferjan currentGame={currentGame} onGameClick={handleChangeGame} />
      <YamaatGame show={currentGame === "yamaat"} />
      <RoabGame show={currentGame === "roab"} />

      {/* *********==== YAMAAT VECTORS ====********* */}
      <div style={{ display: currentGame === "yamaat" ? "block" : "none" }}>
        <Image
          className={classes.yamaatVector1}
          src="/vectors/frejna-banner.png"
          alt="yamaat 1"
          width="491"
          height="540"
        />
        <Image
          className={classes.yamaatVector2}
          src="/vectors/tv-yamaat.svg"
          alt="yamaat 2"
          width="395"
          height="407"
        />
        <Image
          className={classes.yamaatVector3}
          src="/vectors/ball-yamaat.svg"
          alt="yamaat 3"
          width="297"
          height="281"
        />
        <Image
          className={classes.yamaatVector4}
          src="/vectors/tv-yamaat-2.svg"
          alt="yamaat 4"
          width="302"
          height="311"
        />
      </div>

      {/* *********==== ROAB VECTORS ====********* */}
      <div
        className={classes.roabVectors}
        style={{ display: currentGame === "roab" ? "block" : "none" }}
      >
        <Image
          className={classes.roabVector1}
          src="/vectors/roab-1.svg"
          alt="roab 1"
          width="329"
          height="329"
        />
        <Image
          className={classes.roabVector2}
          src="/vectors/roab-2.svg"
          alt="roab 2"
          width="700"
          height="700"
        />
        <Image
          className={classes.roabVector3}
          src="/vectors/roab-3.svg"
          alt="roab 3"
          width="100"
          height="100"
        />
        <Image
          className={classes.roabVector4}
          src="/vectors/roab-4.svg"
          alt="roab 4"
          width="100"
          height="100"
        />
        <Image
          className={classes.roabVector5}
          src="/vectors/roab-5.svg"
          alt="roab 5"
          width="398"
          height="133"
        />
        <Image
          className={classes.roabVector6}
          src="/vectors/roab-6.svg"
          alt="roab 6"
          width="841"
          height="280"
        />
        <Image
          className={classes.roabVector7}
          src="/vectors/roab-7.svg"
          alt="roab 7"
          width="398"
          height="133"
        />
        <Image
          className={classes.roabVector8}
          src="/vectors/roab-8.svg"
          alt="roab 8"
          width="498"
          height="166"
        />
        <Image
          className={classes.roabVector9}
          src="/vectors/roab-9.svg"
          alt="roab 9"
          width="376"
          height="376"
        />
        <Image
          className={classes.roabVector10}
          src="/vectors/roab-3.svg"
          alt="roab 3"
          width="100"
          height="100"
        />
      </div>
    </>
  );
}

export default Game;
