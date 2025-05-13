import classes from "./CategoriesSet.module.css";
import CatCard from "./CatCard";

function CategoriesSet({ title, titleBackColor, children, isCardsSmall }) {
  return (
    <div className={classes.main}>
      <h3 className={classes.title} style={{ background: titleBackColor }}>
        {title}
      </h3>
      <div
        className={`${classes.cardsContainer} ${
          isCardsSmall ? classes.small : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default CategoriesSet;
