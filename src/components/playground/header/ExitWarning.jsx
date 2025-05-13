import classes from "./ExitWarning.module.css";

function ExitWarning({ show, onClosePrompt, onYesClick }) {
  return (
    <>
      <div className={`modal ${classes.main} ${show ? "active" : ""}`}>
        <p className={classes.promptText}>هل انت متأكد من الخروج ؟</p>
        <div className={classes.action}>
          <button
            type="button"
            className={`${classes.btn} ${classes.yesBtn}`}
            onClick={onYesClick}
          >
            نعم
          </button>
          <button
            type="button"
            className={`${classes.btn} ${classes.cancelBtn}`}
            onClick={onClosePrompt}
          >
            إلغاء
          </button>
        </div>
      </div>
      <div
        className={`backdrop ${show ? "active" : ""}`}
        onClick={onClosePrompt}
      />
    </>
  );
}

export default ExitWarning;
