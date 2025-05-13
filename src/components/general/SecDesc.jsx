import classes from "./SecDesc.module.css";

function SecDesc({ children }) {
  return <p className={classes.main}>{children}</p>;
}

export default SecDesc;
