"use client";

import { useEffect, useContext } from "react";
import classes from "./TeamControls.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

import ActiveHelpChance from "../../../general/ActiveHelpChance";

import PlaygroundContext from "@/store/playground-ctx";

function TeamControls({
  teamName,
  teamScore,
  availableChances,
  onHelpChanceClick,
}) {
  const pathname = usePathname();
  const { isVertebraeTry } = useContext(PlaygroundContext);

  useEffect(() => {}, [pathname]);

  return (
    <div className={classes.main}>
      <div className={classes.nameAndScore}>
        <h1
          className={`${classes.name} ${
            teamName.length > 10 ? classes.limitExc : ""
          }`}
          title={teamName}
        >
          {teamName}
        </h1>
        <div className={classes.scoreContainer}>{teamScore}</div>
      </div>
      <div className={classes.help}>
        <h2 className={classes.helpTitle}>وسائل المساعدة</h2>
        <div className={classes.helpChances}>
          {isVertebraeTry ||
          pathname === "/yamaat-playground/game/who-answered" ||
          pathname === "/yamaat-playground/game/answer" ? (
            <>
              <Image
                src={`/icons/help-chance-1-inactive.svg`}
                alt="help chance 1"
                width="51"
                height="51"
                style={{
                  pointerEvents: "none",
                }}
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
            </>
          ) : (
            <>
              <Image
                src={`/icons/help-chance-1${
                  availableChances.aljleeb === 2 ? "-active" : "-inactive"
                }.svg`}
                alt="help chance 1"
                width="51"
                height="51"
                style={{
                  pointerEvents:
                    availableChances.aljleeb === 0 ? "initial" : "none",
                }}
                onClick={onHelpChanceClick.bind(this, "al_jleeb")}
              />
              <Image
                src={`/icons/help-chance-2${
                  availableChances.towAnswer === 1
                    ? "-inactive"
                    : availableChances.towAnswer === 2
                    ? "-active"
                    : ""
                }.svg`}
                alt="help chance 2"
                width="51"
                height="51"
                style={{
                  pointerEvents:
                    availableChances.towAnswer === 0 ? "initial" : "none",
                }}
                onClick={onHelpChanceClick.bind(this, "tow_answer")}
              />
              <Image
                src={`/icons/help-chance-3${
                  availableChances.noAnswer === 1
                    ? "-inactive"
                    : availableChances.noAnswer === 2
                    ? "-active"
                    : ""
                }.svg`}
                alt="help chance 3"
                width="51"
                height="51"
                style={{
                  pointerEvents:
                    availableChances.noAnswer === 0 ? "initial" : "none",
                }}
                onClick={onHelpChanceClick.bind(this, "no_answer")}
              />
            </>
          )}

          {Object.values(availableChances).includes(2) ? (
            <ActiveHelpChance
              activeChance={Object.keys(availableChances).find(
                (c) => availableChances[c] === 2
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TeamControls;
