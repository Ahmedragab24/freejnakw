"use client";

import { useEffect, useState, useRef, useContext } from "react";
import classes from "./RoabIntro.module.css";
import Image from "next/image";

function RoabIntro() {
  const [isRoabIntroVisible, setIsRoabIntoVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      handleCloseIntro();
    }, 10000);
  }, []);

  const handleCloseIntro = () => {
    setIsRoabIntoVisible(false);
  };

  return isRoabIntroVisible ? (
    <>
      <div
        className={`backdrop active ${classes.introBackdrop}`}
        onClick={handleCloseIntro}
      />
      <div className={`modal active ${classes.roabIntroPopup}`}>
        <span className={classes.closeBtn} onClick={handleCloseIntro}>
          ×
        </span>

        <p className={classes.content}>
          <span className={classes.note1}>تحذير !!!</span>
          هذه اللعبة فيها مشاهد مرعبة غير مناسبة لمن هم أقل من 18 سنة
          <span className={classes.note2}>نصيحة</span>
          للحصول على أفضل تجربة، يُفضل إطفاء الأنوار والبقاء في هدوء تام
          <span className={classes.note3}>لا تخافون و ركزوا!</span>
        </p>

        <Image
          className={classes.introVector}
          src="/vectors/roab-playground-1.svg"
          alt="background vector"
          width="248"
          height="318"
        />
      </div>
    </>
  ) : null;
}

export default RoabIntro;
