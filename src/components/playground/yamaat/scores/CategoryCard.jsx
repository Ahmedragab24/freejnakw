import classes from "./CategoryCard.module.css";
import Image from "next/image";

function CatCard({ image, title }) {
  return (
    <div className={classes.main}>
      <div className={classes.imagesContainer}>
        <Image
          className={classes.mainCatImage}
          src="/vectors/playground-game-card-background.png"
          alt={title}
          width="10"
          height="10"
        />
        <Image
          className={classes.gameImage}
          src={image}
          alt={title}
          width="148"
          height="153"
        />
      </div>

      <h4 className={classes.title}>
        {title}
        <Image
          src="/vectors/playground-game-card-title-background.png"
          alt={title}
          width="10"
          height="10"
        />
      </h4>
    </div>
  );
}

export default CatCard;
