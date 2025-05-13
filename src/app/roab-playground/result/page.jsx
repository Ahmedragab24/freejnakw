import classes from "@/styles/playground-result.module.css";
import Res from "@/components/playground/roab/result/Result";
import Image from "next/image";

export default function Result() {
  return (
    <main className={`${classes.main} ${classes.roabState}`}>
      <Res />

      <div className={classes.vectors}>
        <Image
          className={classes.roabVector1}
          src="/vectors/roab-5.svg"
          alt="roab vector"
          width="398"
          height="133"
        />
        <Image
          className={classes.roabVector2}
          src="/vectors/roab-6.svg"
          alt="roab vector"
          width="841"
          height="280"
        />
        <Image
          className={classes.roabVector3}
          src="/vectors/roab-6.svg"
          alt="roab vector"
          width="841"
          height="280"
        />
        <Image
          className={classes.roabVector4}
          src="/vectors/roab-5.svg"
          alt="roab vector"
          width="398"
          height="133"
        />
      </div>
    </main>
  );
}
