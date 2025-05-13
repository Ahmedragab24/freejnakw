"use client";

import { useContext, useState } from "react";
import classes from "./Nav.module.css";
import Link from "next/link";
import Image from "next/image";

import GeneralContext from "@/store/general-ctx";

function Nav({ currentPage, setCurrentPage, onNavItemClick }) {
  const { authData } = useContext(GeneralContext);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const handleToggleNavMenu = () => {
    setIsNavMenuOpen((prev) => !prev);
  };

  const handleCloseNavMenu = () => {
    setIsNavMenuOpen(false);
  };

  return (
    <div className={classes.main}>
      <Image
        className={classes.navMenuIcon}
        src="/icons/hamburger.png"
        alt="hamburger icon"
        width="50"
        height="50"
        onClick={handleToggleNavMenu}
      />

      <nav
        className={`${classes.navMenu} ${isNavMenuOpen ? classes.active : ""}`}
      >
        <Link
          href="/"
          className={[
            classes.navItem,
            classes.navItem1,
            currentPage === "" ? classes.active : "",
          ].join(" ")}
          onClick={() => {
            handleCloseNavMenu();
            setCurrentPage("");
            if (onNavItemClick) onNavItemClick();
          }}
        >
          سالفتنا
        </Link>
        <Link
          href="/start-game"
          className={[
            classes.navItem,
            classes.navItem2,
            currentPage === "start-game" ||
            (currentPage === "my-games" && !authData.token)
              ? classes.active
              : "",
          ].join(" ")}
          onClick={() => {
            handleCloseNavMenu();
            setCurrentPage("start-game");
            if (onNavItemClick) onNavItemClick();
          }}
        >
          العب
        </Link>
        <Link
          href="/contact"
          className={[
            classes.navItem,
            classes.navItem3,
            currentPage === "contact" ? classes.active : "",
          ].join(" ")}
          onClick={() => {
            handleCloseNavMenu();
            setCurrentPage("contact");
            if (onNavItemClick) onNavItemClick();
          }}
        >
          تواصل معنا
        </Link>
        {authData.token ? (
          <Link
            href="/my-games"
            className={[
              classes.navItem,
              classes.navItem4,
              currentPage === "my-games" || currentPage === "my-games"
                ? classes.active
                : "",
            ].join(" ")}
            onClick={() => {
              handleCloseNavMenu();
              setCurrentPage("my-games");
              if (onNavItemClick) onNavItemClick();
            }}
          >
            ألعابي
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

export default Nav;
