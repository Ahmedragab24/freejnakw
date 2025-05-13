"use client";

import { useState } from "react";
import classes from "./Field.module.css";

function CodeField({ children, id, onChange, error }) {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleInputCode = (e, i) => {
    const newCodeValue = [...code];

    newCodeValue[i] =
      e.target.value == 0 || parseInt(e.target.value) ? e.target.value : "";
    setCode(newCodeValue);
    onChange({
      target: {
        id: "otp",
        value: newCodeValue.join(""),
      },
    });

    if (e.target.value && i < 3) e.target.nextElementSibling.focus();
  };

  return (
    <div className={`${classes.main} ${error ? classes.error : ""}`}>
      <label htmlFor={id}>{children}</label>
      <input
        className={classes.codeInput}
        id={id}
        type="text"
        onChange={(e) => {
          handleInputCode(e, 0);
        }}
        value={code[0]}
        maxLength="1"
      />
      <input
        className={classes.codeInput}
        id={id}
        type="text"
        onChange={(e) => {
          handleInputCode(e, 1);
        }}
        value={code[1]}
        maxLength="1"
      />
      <input
        className={classes.codeInput}
        id={id}
        type="text"
        onChange={(e) => {
          handleInputCode(e, 2);
        }}
        value={code[2]}
        maxLength="1"
      />
      <input
        className={classes.codeInput}
        id={id}
        type="text"
        onChange={(e) => {
          handleInputCode(e, 3);
        }}
        value={code[3]}
        maxLength="1"
      />

      {error ? <p className={classes.error}>{error}</p> : null}
    </div>
  );
}

export default CodeField;
