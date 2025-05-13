import classes from "./SubmitButton.module.css";

function SubmitButton({ children }) {
  return <button className={classes.main}>{children}</button>;
}

export default SubmitButton;
