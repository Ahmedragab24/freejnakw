"use client";

import { useContext } from "react";
import classes from "./Score.module.css";
import Image from "next/image";

import GeneralContext from "@/store/general-ctx";

function Score({ onOpenScoreModal, className }) {
  const { authData } = useContext(GeneralContext);

  return (
    <div className={`${classes.main} ${className}`}>
      <Image
        className={classes.plusSign}
        src="/icons/plus.svg"
        alt="plus sign"
        width="30"
        height="30"
        onClick={onOpenScoreModal}
      />
      <p className={classes.text}>
        حصالة الألعاب:
        <span className={classes.scoreNumber}>
          {authData.user ? authData.user.num_of_games : 0}
        </span>
      </p>
    </div>
  );
}

export default Score;
