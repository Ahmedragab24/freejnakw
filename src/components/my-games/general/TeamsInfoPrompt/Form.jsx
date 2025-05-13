"use client";

import { useState, useContext } from "react";
import classes from "./Form.module.css";
import Image from "next/image";

import Counter from "./Counter";
import LoadingSpinner from "../../../general/LoadingSpinner";

import MyGamesContext from "@/store/my-games-ctx";

function Form({ onSubmit }) {
  const { loadingGame } = useContext(MyGamesContext);
  const [teamsData, setTeamsData] = useState({
    // gameName: "",
    team1Name: "",
    team1Count: 1,
    team2Name: "",
    team2Count: 1,
  });

  const handleInputChange = (e) => {
    setTeamsData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(teamsData);
  };

  return (
    <form className={classes.main} onSubmit={handleSubmitForm}>
      {/* <input
        className={classes.input}
        id="gameName"
        type="text"
        placeholder="اسم اللعبة"
        onChange={handleInputChange}
        required
        onInvalid={(e) => {
          e.target.setCustomValidity("من فضلك أدخل اسم اللعبة");
        }}
        onInput={(e) => {
          e.target.setCustomValidity("");
        }}
      /> */}

      <div className={classes.teamsGrid}>
        <div className={classes.team}>
          <h3 className={classes.teamName}>الفريق الأول</h3>
          <input
            className={classes.input}
            id="team1Name"
            type="text"
            placeholder="اسم الفريق الاول"
            onChange={handleInputChange}
            required
            onInvalid={(e) => {
              e.target.setCustomValidity("من فضلك أدخل اسم الفريق الأول");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
            maxLength="22"
          />
          <Counter
            onChange={(count) => {
              handleInputChange({
                target: {
                  id: "team1Count",
                  value: count,
                },
              });
            }}
          />
        </div>
        <div className={classes.team}>
          <h3 className={classes.teamName}>الفريق الثاني</h3>
          <input
            className={classes.input}
            id="team2Name"
            type="text"
            placeholder="اسم الفريق الثاني"
            onChange={handleInputChange}
            required
            onInvalid={(e) => {
              e.target.setCustomValidity("من فضلك أدخل اسم الفريق الثاني");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
            maxLength="22"
          />
          <Counter
            onChange={(count) => {
              handleInputChange({
                target: {
                  id: "team2Count",
                  value: count,
                },
              });
            }}
          />
        </div>
      </div>

      <button className={classes.startPlayingBtn}>
        {loadingGame ? <LoadingSpinner /> : "ابدأ اللعب"}
      </button>
    </form>
  );
}

export default Form;
