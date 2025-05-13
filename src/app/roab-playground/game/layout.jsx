import classes from "@/styles/playground-game.module.css";
import GameSidebar from "@/components/playground/roab/game/sidebar/Sidebar";
import Image from "next/image";

export default function GameLayout({ children }) {
  return (
    <main className={`${classes.main} ${classes.roabState}`}>
      <GameSidebar />
      {children}

      <div className={classes.vectors}>
        <Image
          className={classes.roabVector1}
          src="/vectors/roab-playground-6.svg"
          alt="roab vector"
          width="448"
          height="617"
        />
        <Image
          className={classes.roabVector2}
          src="/vectors/roab-playground-7.svg"
          alt="roab vector"
          width="201"
          height="350"
        />
        <Image
          className={classes.roabVector3}
          src="/vectors/roab-playground-8.svg"
          alt="roab vector"
          width="555"
          height="630"
        />
        <Image
          className={classes.roabVector4}
          src="/vectors/roab-playground-9.svg"
          alt="roab vector"
          width="750"
          height="906"
        />
        <Image
          className={classes.roabVector5}
          src="/vectors/roab-playground-10.svg"
          alt="roab vector"
          width="102"
          height="193"
        />
      </div>
    </main>
  );
}
