"use client";

import { useState } from "react";
import classes from "./Action.module.css";
import Image from "next/image";

import ScoreModal from "../../header/ScoreModal";

function Action({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const handleToggleScoreModal = () => {
    setIsScoreModalOpen((prev) => !prev);
  };

  const handleBuyGame = () => {
    handleToggleScoreModal();
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={classes.main}>
      <form className={classes.searchForm} onSubmit={handleSearch}>
        <input
          className={classes.input}
          type="text"
          placeholder="ابحث في الألعاب"
          onChange={handleSearchQueryChange}
          value={searchQuery}
        />
        <button className={classes.submitBtn}>
          <Image src="/icons/search.svg" alt="search" width="36" height="36" />
        </button>
      </form>

      <button
        type="button"
        className={classes.buyNewGameBtn}
        onClick={handleBuyGame}
      >
        اشتر لعبة جديدة
        <Image src="/icons/cart.svg" alt="cart" width="36" height="36" />
      </button>

      <ScoreModal
        show={isScoreModalOpen}
        onCloseScoreModal={handleToggleScoreModal}
      />
    </div>
  );
}

export default Action;
