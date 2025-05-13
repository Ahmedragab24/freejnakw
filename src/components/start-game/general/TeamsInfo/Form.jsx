"use client";

import { useState, useContext } from "react";
import { redirect } from "next/navigation";
import classes from "./Form.module.css";
import Image from "next/image";

import Counter from "./Counter";
import YamaatGameModes from "./YamaatGameModes";
import LoadingSpinner from "../../../general/LoadingSpinner";

import StartGameContext from "@/store/start-game-ctx";
import GeneralContext from "@/store/general-ctx";

function Form({ gameMode, onSubmit }) {
  const { startingGame } = useContext(StartGameContext);
  const { authData, confirmingAuth } = useContext(GeneralContext);
  const [teamsData, setTeamsData] = useState({
    gameName: "",
    team1Name: "",
    team1Count: 1,
    team2Name: "",
    team2Count: 1,
    gameType: "yamaat",
  });

  const handleInputChange = (e) => {
    setTeamsData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!confirmingAuth && !authData.token) redirect("/auth/signin");

    onSubmit(teamsData);
  };

  const handleChangeGameType = (type) => {
    if (teamsData.gameType === type) {
      setTeamsData((prev) => ({ ...prev, gameType: "yamaat" }));
      return;
    }

    setTeamsData((prev) => ({ ...prev, gameType: type }));
  };

  return (
    <form
      className={`${classes.main} ${
        gameMode === "roab" ? classes.roabMode : ""
      }`}
      onSubmit={handleSubmitForm}
    >
      <input
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
        maxLength="15"
      />

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

      {gameMode === "roab" ? null : (
        <YamaatGameModes
          gameType={teamsData.gameType}
          onModeClick={handleChangeGameType}
        />
      )}

      <button className={classes.startPlayingBtn}>
        {startingGame ? <LoadingSpinner /> : "ابدأ اللعب"}
      </button>
    </form>
  );
}

export default Form;
