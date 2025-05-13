import classes from "./Ads.module.css";

function Ads() {
  return (
    <div className={classes.main}>
      <div className={classes.ad}>مساحة إعلانية</div>
      <hr className={classes.verticalLine} />
      <div className={classes.ad}>مساحة إعلانية</div>
    </div>
  );
}

export default Ads;
