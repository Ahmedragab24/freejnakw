"use client";

import { useContext } from "react";
import classes from "./SecTitle.module.css";

import GeneralContext from "@/store/general-ctx";

function SecTitle({ children, align, className }) {
  const { authData } = useContext(GeneralContext);

  return (
    <h2
      className={`${classes.main} ${
        authData.token ? classes.authed : ""
      } ${className}`}
      style={{ textAlign: align ? align : "center" }}
    >
      {children}
    </h2>
  );
}

export default SecTitle;
