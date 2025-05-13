import classes from "./Notification.module.css";

function Notification({ children, type = "normal" }) {
  return (
    <div className={`${classes.main} ${classes[type]}`}>
      <span className={classes.emoji}>
        {type === "error" ? "❌" : type === "warning" ? "❗" : "👍"}
      </span>
      {children}
    </div>
  );
}

export default Notification;
