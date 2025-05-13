import { useState, useContext } from "react";
import classes from "./YamaatGameModes.module.css";

import ClickOutsideWrapper from "../../../general/ClickOutsideWrapper";

import StartGameContext from "@/store/start-game-ctx";

function YamaatGameModes({ gameType, onModeClick }) {
  const { yamaatCategories } = useContext(StartGameContext);
  const [showVertebraePopup, setShowVertebraePopup] = useState(false);
  const [showLuckPopup, setShowLuckPopup] = useState(false);

  const handleToggleVertebraePopup = (e) => {
    e.stopPropagation();
    setShowVertebraePopup((prev) => !prev);
  };

  const handleCloseVertebraePopup = () => {
    setShowVertebraePopup(false);
  };

  const handleToggleLuckPopup = (e) => {
    e.stopPropagation();
    setShowLuckPopup((prev) => !prev);
  };

  const handleCloseLuckPopup = () => {
    setShowLuckPopup(false);
  };

  return (
    <div className={classes.gameModes}>
      <div
        className={`${classes.activateBox} ${
          gameType === "vertebrae" ? classes.active : ""
        } ${yamaatCategories.activate_paragraphs ? "" : classes.disabled}`}
        onClick={onModeClick.bind(this, "vertebrae")}
      >
        تفعيل الفقرات
        {!yamaatCategories.activate_paragraphs ? " (ستجدد قريبًا)" : ""}
        <span
          className={classes.activateInfo}
          onClick={handleToggleVertebraePopup}
        >
          i
        </span>
        <ClickOutsideWrapper
          onClickOutside={handleCloseVertebraePopup}
          className={`${classes.infoPopup} ${
            showVertebraePopup ? classes.active : ""
          }`}
        >
          الفقرات عبارة عن تحديين لكل فريق يضيفون الحماس للعبة، كل فقرة
  الفريق يفوز فيها ياخذ نقاطها، وإذا ما عداها تروح النقاط للفريق الثاني
        </ClickOutsideWrapper>
      </div>

      <div
        className={`${classes.luckMode} ${
          gameType === "luck" ? classes.active : ""
        }`}
        onClick={onModeClick.bind(this, "luck")}
      >
        انت وحظك !
        <span
          className={classes.luckModeInfoIcon}
          onClick={handleToggleLuckPopup}
        >
          i
        </span>
        <ClickOutsideWrapper
          onClickOutside={handleCloseLuckPopup}
          className={`${classes.infoPopup} ${
            showLuckPopup ? classes.active : ""
          }`}
        >
          ستتحول اللعبة إلى لعبة تعتمد على الحظ، حيث لن يتم اختيار النقاط
          يدويًا، بل ستُحدد بشكل عشوائي
        </ClickOutsideWrapper>
      </div>
    </div>
  );
}

export default YamaatGameModes;
