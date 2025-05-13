"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import GeneralContext from "./general-ctx";
import {
  storeMyYamaatGames,
  storeMyHorrorGames,
  storeCurrentGame,
} from "../utils/local-storage";

const MyGamesContext = React.createContext({});

export function MyGamesContextProvider({ children }) {
  const router = useRouter();
  const { authData, showNotification } = useContext(GeneralContext);
  const [loadingGames, setLoadingGames] = useState(false);
  const [loadingGame, setLoadingGame] = useState(false);
  const [myYamaatGames, setMyYamaatGames] = useState([]);
  const [myHorrorGames, setMyHorrorGames] = useState([]);

  const handleGetMyGames = useCallback(async () => {
    setLoadingGames(true);

    try {
      const allYamaatResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/my-games",
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const horrorResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/my-games?type=horror",
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setMyHorrorGames(horrorResponse.data.data);
      storeMyHorrorGames(horrorResponse.data.data);
      setMyYamaatGames(allYamaatResponse.data.data);
      storeMyYamaatGames(allYamaatResponse.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGames(false);
    }
  }, [authData.token]);

  useEffect(() => {
    if (authData.token) {
      handleGetMyGames();
    }
  }, [authData.token, handleGetMyGames]);

  const handleResumeGame = async (gameID, gameType = "yamaat") => {
    setLoadingGame(true);

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/games/${gameID}`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        storeCurrentGame(response.data.data);
        router.push(
          gameType === "yamaat" ? "/yamaat-playground" : "/roab-playground"
        );
      } else {
        showNotification("حدث خطأ ما. من فضلك حاول مجددًا!", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGame(false);
    }
  };

  const handleRestartGame = async (data, gameType = "yamaat") => {
    setLoadingGame(true);

    const payload = {
      game_id: data.gameID,
      name_first_player: data.team1Name,
      name_second_player: data.team2Name,
      num_first_player: data.team1Count,
      num_second_player: data.team2Count,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/game/duplicate",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      if (response.data.status_code === 200) {
        storeCurrentGame(response.data.data);
        router.push(
          gameType === "yamaat" ? "/yamaat-playground" : "/roab-playground"
        );
      } else {
        showNotification("حدث خطأ ما. من فضلك حاول مجددًا!", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGame(false);
    }
  };

  const context = {
    myYamaatGames,
    myHorrorGames,
    loadingGames,
    loadingGame,
    // * METHODs
    resumeGame: handleResumeGame,
    restartGame: handleRestartGame,
  };

  return (
    <MyGamesContext.Provider value={context}>
      {children}
    </MyGamesContext.Provider>
  );
}

export default MyGamesContext;
