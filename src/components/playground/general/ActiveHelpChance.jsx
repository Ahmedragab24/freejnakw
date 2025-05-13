"use client";

import { useEffect } from "react";
import classes from "./ActiveHelpChance.module.css";
import Image from "next/image";

function ActiveHelpChance({ activeChance }) {
  //   useEffect(() => {
  //     console.log(activeChance);
  //   }, []);

  let imageSrc, textContent, mainBackgroundColor;
  switch (activeChance) {
    case "aljleeb":
      imageSrc = "/icons/help-chance-1-very-active.svg";
      textContent = "الجليب";
      mainBackgroundColor = "var(--color-back-yellow)";
      break;

    case "towAnswer":
      imageSrc = "/icons/help-chance-2-active.svg";
      textContent = "جاوب جوابين";
      mainBackgroundColor = "var(--color-back-orange)";
      break;

    //   * For "noAnswer" Chance
    default:
      imageSrc = "/icons/help-chance-3-active.svg";
      textContent = "الفريق الثاني لا يجاوب";
      mainBackgroundColor = "var(--color-sec)";
      break;
  }

  return (
    <div
      className={classes.main}
      style={{ backgroundColor: mainBackgroundColor }}
    >
      <Image src={imageSrc} alt={textContent} width="32" height="32" />
      {textContent}
    </div>
  );
}

export default ActiveHelpChance;
