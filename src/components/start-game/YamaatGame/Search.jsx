"use client";

import { useState } from "react";
import classes from "./Search.module.css";
import Image from "next/image";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      className={classes.main}
      onSubmit={handleSearch}
      id="start-game-yamaat-categories-section"
    >
      <input
        className={classes.input}
        type="text"
        placeholder="ابحث في الفئات"
        onChange={handleQueryChange}
      />
      <button className={classes.submitBtn}>
        <Image src="/icons/search.svg" alt="search" width="36" height="36" />
      </button>
    </form>
  );
}

export default Search;
