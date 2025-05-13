import classes from "./Desc.module.css";

function Desc({ children }) {
  return <p className={classes.main}>{children}</p>;
}

export default Desc;
