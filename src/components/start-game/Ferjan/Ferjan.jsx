import { useContext } from "react";
import classes from "./Ferjan.module.css";
import Image from "next/image";

import Title from "../../general/SecTitle";
import Card from "./Card";

import GeneralContext from "@/store/general-ctx";

function Ferjan({ currentGame, onGameClick }) {
  const { authData } = useContext(GeneralContext);

  return (
    <section
      className={`${classes.main} ${
        currentGame === "roab" ? classes.roabMode : ""
      }`}
      id="start-game-ferjan-section"
    >
      <Title>الفرجان</Title>
      {authData.token ? null : (
        <p className={classes.description}>
          احصل على تجربة مجانية عند إنشاء حساب جديد
        </p>
      )}
      <div className={classes.cardsContainer}>
        <Card
          gameName="yamaat"
          gameImage="/vectors/ferjan-1.svg"
          gameColor="#FFB81B"
          currentGame={currentGame}
          onClick={onGameClick}
        />
        <Card
          gameName="roab"
          gameImage="/vectors/ferjan-2.svg"
          gameColor="#1A2626"
          currentGame={currentGame}
          onClick={onGameClick}
        />
      </div>
    </section>
  );
}

export default Ferjan;
