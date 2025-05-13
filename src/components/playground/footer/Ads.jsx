import classes from "./Ads.module.css";

function Ads({ gameMode }) {
  return (
    <div
      className={`${classes.main} ${
        gameMode === "roab" ? classes.roabMode : ""
      }`}
    >
      <div className={classes.ad}>مساحة إعلانية</div>
      <hr className={classes.verticalLine} />
      <div className={classes.ad}>مساحة إعلانية</div>
    </div>
  );
}

export default Ads;
