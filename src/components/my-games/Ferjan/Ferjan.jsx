import classes from "./Ferjan.module.css";
import Image from "next/image";

import Title from "../../general/SecTitle";
import Description from "../../general/SecDesc";
import Card from "./Card";

function Ferjan({ currentGame, onGameClick }) {
  return (
    <section
      className={`${classes.main} ${
        currentGame === "roab" ? classes.roabMode : ""
      }`}
      id="my-games-ferjan-section"
    >
      <Title className={classes.title}>ألعابي</Title>
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
