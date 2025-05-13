"use client";

import { useState } from "react";
import classes from "./ResumeConfirm.module.css";

function ResumeConfirm({
  show,
  onClosePrompt,
  onResumeClick,
  onStartNewClick,
}) {
  return (
    <>
      <div className={`modal ${classes.main} ${show ? "active" : ""}`}>
        <p className={classes.promptText}>
          لديك لعبة قائمة
          <br />
          هل ترغب في المتابعة أم البدء من جديد ؟
        </p>

        <div className={classes.actionBtns}>
          <button
            type="button"
            className={`${classes.btn} ${classes.resumeBtn}`}
            onClick={onResumeClick}
          >
            المتابعة
          </button>
          <button
            type="button"
            className={`${classes.btn} ${classes.startNewBtn}`}
            onClick={onStartNewClick}
          >
            البدء من جديد
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

export default ResumeConfirm;
