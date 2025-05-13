"use client";

import classes from "./Form.module.css";

function Form({ children, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={classes.main} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default Form;
