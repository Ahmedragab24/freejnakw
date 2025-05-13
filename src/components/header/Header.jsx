"use client";

import { useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import Score from "./Score";
import SigninButton from "./SigninButton";
import ProfileButton from "./ProfileButton";
import ScoreModal from "./ScoreModal";
import HamMenu from "./HamMenu";
import LoadingSpinner from "../general/LoadingSpinner";

import GeneralContext from "@/store/general-ctx";

function Header() {
  const { authData, confirmingAuth } = useContext(GeneralContext);
  const [currentPage, setCurrentPage] = useState("");
  const [isScoreOpened, setIsScoreOpened] = useState(false);
  const [isHamMenuOpened, setIsHamMenuOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(pathname.slice(1));
  }, [pathname]);

  const toggleScoreModal = () => {
    setIsScoreOpened((prev) => !prev);
  };

  const toggleHamMenu = () => {
    setIsHamMenuOpened((prev) => !prev);
  };

  if (confirmingAuth) return <LoadingSpinner fullscreen />;

  return (
    <header className={classes.main}>
      <div className={classes.navContainer}>
        <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>

      <div className={classes.layoutFix} />

      <Link href="/" className={classes.logoLink}>
        <Image src="/icons/logo.svg" alt="logo" width="79" height="60" />
      </Link>

      {authData.token ? (
        <>
          <Score onOpenScoreModal={toggleScoreModal} />
          <ScoreModal
            show={isScoreOpened}
            onCloseScoreModal={toggleScoreModal}
          />
        </>
      ) : null}

      {authData.token ? <ProfileButton /> : <SigninButton />}

      <Image
        className={classes.hamburgerIcon}
        src="/icons/hamburger.png"
        alt="hamburger icon"
        width="50"
        height="50"
        onClick={toggleHamMenu}
      />

      <HamMenu
        active={isHamMenuOpened}
        onClose={toggleHamMenu}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenScoreModal={toggleScoreModal}
      />
    </header>
  );
}

export default Header;
