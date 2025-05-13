"use client";

import { useEffect, useState } from "react";
import classes from "./GameHero.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function Hero({ className, currentGame }) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("start-game");

  useEffect(() => {
    setCurrentPage(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <section
      className={`${classes.main} ${
        currentGame === "roab" ? classes.roabMode : ""
      } ${className}`}
    >
      <div className={classes.heroVectors}>
        <Image
          className={classes.vector1}
          src={`/vectors/play-hero-vector-1${
            currentGame === "roab" ? "-dark" : ""
          }.svg`}
          alt="play"
          width="1561"
          height="1502"
        />
        <Image
          className={classes.vector2}
          src={`/vectors/play-hero-vector-2${
            currentGame === "roab" ? "-dark" : ""
          }.svg`}
          alt="play"
          width="1341"
          height="1341"
        />
        <Image
          className={classes.vector3}
          src={`/vectors/play-hero-vector-3${
            currentGame === "roab" ? "-dark" : ""
          }.svg`}
          alt="play"
          width="1118"
          height="1118"
        />
      </div>

      <h1 className={classes.title}>من بين الفرجان .. أي فريج بتختار؟</h1>
      {/* <div className={classes.description}>
        <p>
          لإنشاء لعبة جديدة اضغط على{" "}
          <span className={classes.orangeWord}>لعبة جديدة</span>
        </p>
        <p>
          ولعرض ألعابك السابقة اضغط على{" "}
          <span className={classes.orangeWord}>ألعابي</span>
        </p>
      </div> */}
      <div className={classes.action}>
        <Link
          href="/start-game#start-game-ferjan-section"
          className={`${classes.newGameBtn} ${
            currentPage === "start-game" ? classes.active : ""
          }`}
        >
          لعبة جديدة
        </Link>
        <Link
          href="/my-games#my-games-ferjan-section"
          className={`${classes.myGamesBtn} ${
            currentPage === "my-games" ? classes.active : ""
          }`}
        >
          ألعابي
        </Link>
      </div>
    </section>
  );
}

export default Hero;
