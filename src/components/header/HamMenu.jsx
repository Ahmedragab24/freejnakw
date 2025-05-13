import classes from "./HamMenu.module.css";
import Image from "next/image";

import Nav from "./Nav";
import Score from "./Score";

function HamMenu({
  active,
  onClose,
  currentPage,
  setCurrentPage,
  onOpenScoreModal,
}) {
  return (
    <div className={`${classes.main} ${active ? classes.active : ""}`}>
      <Image
        className={classes.closeBtn}
        src="/icons/close.png"
        alt="close button"
        width="50"
        height="50"
        onClick={onClose}
      />

      <Nav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavItemClick={onClose}
      />

      <Score
        className={classes.hamMenuScore}
        onOpenScoreModal={() => {
          onClose();
          onOpenScoreModal();
          console.log("clicked");
        }}
      />
    </div>
  );
}

export default HamMenu;
