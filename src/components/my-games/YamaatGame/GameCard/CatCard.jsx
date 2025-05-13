import classes from "./CatCard.module.css";
import Image from "next/image";

function CatCard({ image, title }) {
  return (
    <div className={classes.main}>
      <div className={classes.imageContainer}>
        <Image src={image} alt={title} fill />
      </div>
      <div className={classes.imageBorder}></div>
      <h4 className={classes.title}>{title}</h4>
    </div>
  );
}

export default CatCard;
