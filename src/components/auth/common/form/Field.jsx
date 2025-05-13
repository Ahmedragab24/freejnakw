"use client";

import { useState, useRef } from "react";
import classes from "./Field.module.css";
import Image from "next/image";

import CountryCodeSelector from "./CountryCodeSelector";

function Field({
  children,
  id,
  type,
  name,
  placeholder,
  onChange,
  value,
  defaultChecked,
  onCountryCodeChange,
  error,
  noLabel,
  countryCode,
}) {
  let additionalJSX = null;
  const [inputType, setInputType] = useState(type);

  // ^ Handle show or hide password
  const handleTogglePasswordVisibility = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  if (type === "password") {
    additionalJSX = (
      <Image
        className={`${classes.showPasswordIcon} ${
          noLabel ? classes.noLabelPosition : ""
        }`}
        src={`/icons/${
          inputType === "password" ? "hide" : "show"
        }-password.png`}
        alt="show password"
        width="24"
        height="24"
        onClick={handleTogglePasswordVisibility}
      />
    );
  } else if (type === "tel") {
    additionalJSX = (
      <div className={classes.countryCode}>
        <CountryCodeSelector
          onChange={onCountryCodeChange}
          value={countryCode}
        />
      </div>
    );
  } else if (type === "radio") {
    return (
      <label
        className={`${classes.main} ${error ? classes.error : ""}`}
        htmlFor={id}
      >
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          defaultChecked={defaultChecked}
        />
        <span className={classes.radioMark}></span>
        {children}
      </label>
    );
  }

  return (
    <div className={`${classes.main} ${error ? classes.error : ""}`}>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {additionalJSX}

      {error ? <p className={classes.error}>{error}</p> : null}
    </div>
  );
}

export default Field;
