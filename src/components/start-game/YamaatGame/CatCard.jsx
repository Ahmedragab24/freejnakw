"use client";

import { useState } from "react";
import classes from "./CatCard.module.css";
import Image from "next/image";

import getTimeDifference from "@/utils/get-time-difference";

function CatCard({
  image,
  title,
  description,
  gamesNumber,
  isSmall,
  isActive,
  isDisabled,
  isMedium,
  onClick,
  ranOut,
  endAt,
}) {
  const [showGameInfo, setShowGameInfo] = useState(false);

  const handleShowGameInfo = (e) => {
    e.stopPropagation();

    setShowGameInfo(true);

    setTimeout(() => {
      setShowGameInfo(false);
    }, 2500);
  };

  return (
    <div
      className={`${classes.main} ${isSmall ? classes.small : ""} ${
        isMedium ? classes.medium : ""
      } ${isActive ? classes.active : ""} ${
        showGameInfo ? classes.gameInfoActive : ""
      } ${isDisabled ? classes.disabled : ""} ${ranOut ? classes.ranOut : ""}`}
      onClick={onClick}
    >
      {!isSmall && !isMedium ? (
        endAt === null ? (
          <Image
            className={classes.exclusiveFlagVector}
            src={`/vectors/exclusive-category-flag${
              isDisabled ? "-disabled" : ""
            }.png`}
            alt={title}
            width="80"
            height="72"
          />
        ) : (
          <Image
            className={classes.temporaryVector}
            src={`/vectors/temporary.png`}
            alt={title}
            width="80"
            height="72"
          />
        )
      ) : null}

      {!isSmall && !isMedium && endAt !== null ? (
        <span className={classes.remainingCategoryTime}>
          <Image
            src="/vectors/remaining-time-background.png"
            alt={title}
            width="10"
            height="10"
          />
          <span>{getTimeDifference(endAt)}</span>
        </span>
      ) : null}

      {!isMedium ? (
        <span className={classes.infoIconCont} onClick={handleShowGameInfo}>
          <Image
            className={classes.excMark}
            src="/icons/exclamation-mark.svg"
            alt="exclamation mark"
            width="3"
            height="10"
          />
        </span>
      ) : null}

      <div
        className={`${classes.imageContainer} ${
          isDisabled ? classes.disabled : ""
        }`}
      >
        <Image src={image} alt={title} fill />
      </div>

      <div
        className={`${classes.imageBorder} ${isActive ? classes.active : ""}`}
      ></div>

      <h4
        className={`${classes.title} ${isActive ? classes.active : ""} ${
          isDisabled ? classes.disabled : ""
        }`}
      >
        {title}
      </h4>

      <div className={classes.cardBack}>
        <p className={classes.description}>
          {description}
          {!isSmall && !isMedium ? (
            <span className={classes.remaining}>باقي {gamesNumber} لعبة</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default CatCard;
