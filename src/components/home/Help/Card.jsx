import classes from "./Card.module.css";
import Image from "next/image";

function Card({ vectorImage, title, description, note, color }) {
  return (
    <div className={classes.main}>
      <div className={classes.vectorContainer}>
        <Image
          className={classes.vectorImage}
          src={vectorImage}
          alt={title}
          fill
        />
      </div>

      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
      <div className={classes.note} style={{ backgroundColor: color }}>
        {note}
      </div>
    </div>
  );
}

export default Card;
