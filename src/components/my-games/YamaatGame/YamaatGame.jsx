"use client";

import { useContext, useState } from "react";
import classes from "./YamaatGame.module.css";
import Action from "../Action/Action";
import GameCard from "./GameCard/GameCard";
import LoadingSpinner from "../../general/LoadingSpinner";

import MyGamesContext from "@/store/my-games-ctx";

function YamaatGame({ show }) {
  const { loadingGames, myYamaatGames, resumeGame, restartGame, loadingGame } =
    useContext(MyGamesContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchMyGames = (searchQuery) => {
    let newSearchResults = [];

    if (searchQuery.length) {
      setIsSearching(true);

      newSearchResults = myYamaatGames.filter((game) => {
        return (
          game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.categories.some(
            (cat) =>
              cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              cat.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          game.first_player.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          game.second_player.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    } else {
      setIsSearching(false);
    }

    setSearchResults(newSearchResults);
  };

  if (loadingGames || loadingGame) return <LoadingSpinner fullscreen />;

  return (
    <section
      className={`${classes.main} ${show ? classes.active : ""}`}
      id="my-games-yamaat-game-section"
    >
      <Action onSearch={handleSearchMyGames} />

      <div className={classes.gamesCardsContainer}>
        {!isSearching
          ? myYamaatGames.map((game) => {
              return (
                <GameCard
                  key={game.id}
                  gameID={game.id}
                  gameMode={game.type_of_game}
                  gameName={game.name}
                  playingTimes={game.num_of_play}
                  gameCategories={game.categories}
                  onResumeGame={resumeGame.bind(this, game.id, "yamaat")}
                  onRestartGame={restartGame}
                />
              );
            })
          : searchResults.map((game) => {
              return (
                <GameCard
                  key={game.id}
                  gameID={game.id}
                  gameMode={game.type_of_game}
                  gameName={game.name}
                  playingTimes={game.num_of_play}
                  gameCategories={game.categories}
                  onResumeGame={resumeGame.bind(this, game.id, "yamaat")}
                  onRestartGame={restartGame}
                />
              );
            })}

        {myYamaatGames.length === 0 && searchResults.length === 0 ? (
          <p className={classes.noGamesText}>لا يوجد ألعاب</p>
        ) : null}
      </div>
    </section>
  );
}

export default YamaatGame;
