"use client";

import { useState } from "react";
import classes from "./Card.module.css";
import Image from "next/image";

import ScoreModal from "../../header/ScoreModal";

function Card({
  gamesCount,
  description,
  price,
  color,
  textColor,
  isDiscounted,
  discountPercentage,
  discountBackground,
}) {
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const handleToggleScoreModal = () => {
    setIsScoreModalOpen((prev) => !prev);
  };

  const handleBuyGame = () => {
    handleToggleScoreModal();
  };

  return (
    <div className={classes.main} style={{ backgroundColor: color }}>
      {isDiscounted ? (
        <div className={classes.discountContainer}>
          <Image
            src={discountBackground}
            alt={discountPercentage + " discount"}
            fill
          />
          <span className={classes.discountPercentage}>
            {discountPercentage}%
          </span>
        </div>
      ) : null}

      <div className={classes.gamesCount}>
        <span className={classes.number}>{gamesCount}</span>
        لعبة
      </div>
      <div className={classes.details}>{description}</div>
      <div className={classes.footer}>
        <div className={classes.priceContainer}>
          <span className={classes.price}>{price}</span>&nbsp; د.ك
        </div>
        <button
          type="button"
          className={classes.purchaseBtn}
          onClick={handleBuyGame}
        >
          شراء
        </button>
      </div>

      <ScoreModal
        show={isScoreModalOpen}
        onCloseScoreModal={handleToggleScoreModal}
        page="packs"
        initialNumOfGames={parseInt(gamesCount)}
        initialChosenPrice={parseFloat(price)}
      />
    </div>
  );
}

export default Card;
