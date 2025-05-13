import { useState, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import classes from "./Action.module.css";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "../../general/LoadingSpinner";
import ExitWarning from "./ExitWarning";

import PlaygroundContext from "@/store/playground-ctx";

function Action({ gameMode, currentGame }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    updateCurrentGameState,
    currentGameState,
    updateGameInBackend,
    updatingGame,
    loadingGame,
    turnPlayer,
    playingPlayer,
  } = useContext(PlaygroundContext);
  const [isExitWarningActive, setIsExitWarningActive] = useState(false);

  const handleToggleExitWarning = () => {
    setIsExitWarningActive((prev) => !prev);
  };

  const handleExitGame = () => {
    // 1. Update the game state in the backend
    updateGameInBackend();

    // 2. Route to my-games page
    router.replace("/my-games");
  };

  const handleReturnToPanel = () => {
    if (
      pathname === `/${gameMode}-playground` ||
      pathname === `/${gameMode}-playground/result`
    )
      return;

    const newCurrentGameState = { ...currentGameState };

    // 1. Disabling the active help chance if exists
    if (pathname === `/${gameMode}-playground/game`) {
      Object.keys(newCurrentGameState).forEach((key) => {
        if (newCurrentGameState[key] === 2) {
          newCurrentGameState[key] = 0;
          updateCurrentGameState(key, newCurrentGameState[key]);
        }
      });
    }

    router.push(`/${gameMode}-playground`);
  };

  const handleEndGame = () => {
    if (pathname === `/${gameMode}-playground/result`) return;

    // 1. Update the game state in the backend
    updateGameInBackend();

    // 2. Route to the result page
    router.push(`/${gameMode}-playground/result`);
  };

  return (
    <div
      className={`${classes.main} ${
        gameMode === "roab" ? classes.roabMode : ""
      }`}
    >
      {!loadingGame ? (
        <span
          className={`${classes.actionBtn} ${classes.turnBtn} ${
            playingPlayer === "first_player"
              ? currentGame.first_player.name.length > 10
                ? classes.limitExc
                : ""
              : currentGame.second_player.name.length > 10
              ? classes.limitExc
              : ""
          }`}
          onClick={turnPlayer}
          title={
            playingPlayer === "first_player"
              ? currentGame.first_player.name
              : currentGame.second_player.name
          }
        >
          <Image
            src="/icons/change-turns.svg"
            alt="exit"
            width="24"
            height="24"
          />
          <span>دور</span>{" "}
          {playingPlayer === "first_player"
            ? currentGame.first_player.name
            : currentGame.second_player.name}
        </span>
      ) : null}
      <span className={classes.actionBtn} onClick={handleReturnToPanel}>
        <Image src="/icons/home.svg" alt="exit" width="26" height="26" />
        الرجوع للوحة
      </span>
      <span className={classes.actionBtn} onClick={handleEndGame}>
        <Image src="/icons/end-game.svg" alt="exit" width="24" height="24" />
        انتهاء اللعبة
      </span>
      <span
        className={`${classes.actionBtn} ${classes.exitBtn}`}
        onClick={handleToggleExitWarning}
      >
        <Image src="/icons/exit.svg" alt="exit" width="24" height="24" />
        الخروج
      </span>

      {updatingGame ? <LoadingSpinner fullscreen /> : null}
      <ExitWarning
        show={isExitWarningActive}
        onClosePrompt={handleToggleExitWarning}
        onYesClick={handleExitGame}
      />
    </div>
  );
}

export default Action;
