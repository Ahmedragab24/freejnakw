"use client";

import { useState } from "react";
import classes from "./Card.module.css";
import Image from "next/image";

function Card({ gameName, gameImage, gameColor, currentGame, onClick }) {
  return (
    <div
      className={`${classes.main} ${gameName === "roab" ? classes.roab : ""} ${
        currentGame === gameName ? classes.active : ""
      }`}
      style={{ backgroundColor: gameColor }}
      onClick={() => {
        onClick(gameName);
      }}
    >
      {gameName === "roab" ? (
        <>
          <Image
            className={classes.vector1}
            src="/vectors/ferjan-2.1.svg"
            alt={gameName}
            width="79"
            height="79"
          />
          <Image
            className={classes.vector2}
            src="/vectors/ferjan-2.2.svg"
            alt={gameName}
            width="79"
            height="79"
          />
          <Image
            className={classes.vector3}
            src="/vectors/ferjan-2.3.svg"
            alt={gameName}
            width="74"
            height="79"
          />
          <Image
            className={classes.vector4}
            src="/vectors/ferjan-2.4.svg"
            alt={gameName}
            width="91"
            height="79"
          />
        </>
      ) : null}
      <Image
        className={classes.gameImage}
        src={gameImage}
        alt={gameName}
        width="160"
        height="160"
      />
    </div>
  );
}

export default Card;
