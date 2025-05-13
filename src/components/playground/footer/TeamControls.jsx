"use client";

import { useContext } from "react";
import classes from "./TeamControls.module.css";
import Image from "next/image";

import ScoreCounter from "./ScoreCounter";
import VertebraeScore from "./VertebraeScore";

import PlaygroundContext from "@/store/playground-ctx";

function TeamControls({
  gameMode,
  teamName,
  teamScore,
  availableChances,
  onScoreChange,
  onAljleebHelpClick,
  onVertebraeTwoClick,
  onVertebraeOneClick,
}) {
  const { yamaatGameMode } = useContext(PlaygroundContext);

  return (
    <div
      className={`${classes.main} ${
        yamaatGameMode === "vertebrae" ? classes.vertebraeMode : ""
      }`}
    >
      <div className={classes.nameAndScore}>
        <h1
          className={`${classes.name} ${
            teamName.length > 10 ? classes.limitExc : ""
          }`}
          title={teamName}
        >
          {teamName}
        </h1>
        <ScoreCounter score={teamScore} onChange={onScoreChange} />
      </div>

      {gameMode === "yamaat" ? (
        <div className={classes.help}>
          <div>
            <h2 className={classes.helpTitle}>وسائل المساعدة</h2>
            <div className={classes.helpChances}>
              <Image
                src={`/icons/help-chance-1${
                  availableChances.aljleeb === 1
                    ? "-inactive"
                    : availableChances.aljleeb === 2
                    ? "-active"
                    : ""
                }.svg`}
                alt="help chance 1"
                width="51"
                height="51"
                style={{
                  pointerEvents:
                    availableChances.aljleeb === 0 ? "initial" : "none",
                }}
                onClick={onAljleebHelpClick}
              />
              <Image
                src={`/icons/help-chance-2-inactive.svg`}
                alt="help chance 2"
                width="51"
                height="51"
                style={{
                  pointerEvents: "none",
                }}
              />
              <Image
                src={`/icons/help-chance-3-inactive.svg`}
                alt="help chance 3"
                width="51"
                height="51"
                style={{
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* * FOR the "vertebrae" game * */}
          {yamaatGameMode === "vertebrae" ? (
            <div className={classes.vertebraeChances}>
              <h2 className={classes.helpTitle}>الفقرات</h2>
              <div className={classes.helpChances}>
                <VertebraeScore
                  score="600"
                  isUsed={availableChances.vertebrae_two === 1}
                  onClick={onVertebraeTwoClick}
                />
                <VertebraeScore
                  score="400"
                  isUsed={availableChances.vertebrae_one === 1}
                  onClick={onVertebraeOneClick}
                />
              </div>
            </div>
          ) : null}
          {/* * ************************ * */}
        </div>
      ) : null}
    </div>
  );
}

export default TeamControls;
