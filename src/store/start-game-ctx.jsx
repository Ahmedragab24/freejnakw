"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import GeneralContext from "./general-ctx";
import {
  storeYamaatCategories,
  storeCurrentGame,
} from "../utils/local-storage";

const StartGameContext = React.createContext({});

export function StartGameContextProvider({ children }) {
  const router = useRouter();
  const { confirmingAuth, authData, showNotification, updateUserData } =
    useContext(GeneralContext);
  const [yamaatCategories, setYamaatCategories] = useState({
    categoriesNormal: [],
    categoriesPremium: [],
  });
  const [loadingYamaatCategories, setLoadingYamaatCategories] = useState(false);
  const [startingGame, setStartingGame] = useState(false);



  const handleGetYamaatCategories = useCallback(async () => {
    setLoadingYamaatCategories(true);

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/categories",
        {
          headers: {
            Authorization: authData.token ? `Bearer ${authData.token}` : "",
          },
        }
      );

      storeYamaatCategories(response.data);
      setYamaatCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingYamaatCategories(false);
    }
  }, [authData.token]);

    useEffect(() => {
    if (!confirmingAuth) handleGetYamaatCategories();
  }, [confirmingAuth, handleGetYamaatCategories]);

  const handleStartGame = async (data, gameType) => {
    setStartingGame(true);

    const reqBody = {
      name: data.teamsData.gameName,
      name_first_player: data.teamsData.team1Name,
      name_second_player: data.teamsData.team2Name,
      num_first_player: data.teamsData.team1Count,
      num_second_player: data.teamsData.team2Count,
      type_of_game: gameType,
      categories:
        gameType === "yamaat" || gameType === "luck" || gameType === "vertebrae"
          ? data.selectedCategories
          : [1], // [1] is for horror game type
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/store-game",
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        storeCurrentGame(response.data.data);
        router.push(
          gameType === "yamaat" ||
            gameType === "luck" ||
            gameType === "vertebrae"
            ? "/yamaat-playground"
            : "/roab-playground"
        );
        updateUserData();
      } else {
        showNotification("حدث خطأ ما. من فضلك حاول مجددًا!", "error");
      }
    } catch ({ response }) {
      showNotification(response.data.message, "error");
    } finally {
      setStartingGame(false);
    }
  };

  const context = {
    loadingYamaatCategories,
    yamaatCategories,
    startingGame,
    // * METHODs
    startGame: handleStartGame,
  };

  return (
    <StartGameContext.Provider value={context}>
      {children}
    </StartGameContext.Provider>
  );
}

export default StartGameContext;
