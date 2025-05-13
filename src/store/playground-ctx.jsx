"use client";

import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

import {
  getCurrentGame,
  storeCurrentGame,
  storeCurrentQuestion,
  getCurrentQuestion,
} from "../utils/local-storage";
import GeneralContext from "./general-ctx";

const PlaygroundContext = React.createContext({});

// Request Queue Implementation
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.retryDelay = 1000; // Initial delay in ms
    this.maxRetries = 3;
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject, retries: 0 });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const { request, resolve, reject, retries } = this.queue[0];

    try {
      const response = await request();
      resolve(response);
      this.queue.shift();
      this.processing = false;
      this.retryDelay = 1000; // Reset delay on success
      this.processQueue();
    } catch (error) {
      if (error.response?.status === 429 && retries < this.maxRetries) {
        // Exponential backoff
        const delay = Math.min(this.retryDelay * Math.pow(2, retries), 10000);
        this.queue[0].retries++;
        this.retryDelay = delay;
        
        setTimeout(() => {
          this.processing = false;
          this.processQueue();
        }, delay);
      } else {
        reject(error);
        this.queue.shift();
        this.processing = false;
        this.processQueue();
      }
    }
  }
}

export function PlaygroundContextProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authData } = useContext(GeneralContext);
  
  // Initialize request queue
  const requestQueue = useMemo(() => new RequestQueue(), []);

  // Memoize initial state
  const initialState = useMemo(() => ({
    categories: [
      { id: 0, viewed_question_points: [], viewed_question: [] },
      { id: 0, viewed_question_points: [], viewed_question: [] },
      { id: 0, viewed_question_points: [], viewed_question: [] },
      { id: 0, viewed_question_points: [], viewed_question: [] },
      { id: 0, viewed_question_points: [], viewed_question: [] },
      { id: 0, viewed_question_points: [], viewed_question: [] },
    ],
    first_player_points: 0,
    first_player_al_jleeb: 0,
    first_player_tow_answer: 0,
    first_player_no_answer: 0,
    first_player_vertebrae_one: 0,
    first_player_vertebrae_two: 0,
    second_player_points: 0,
    second_player_al_jleeb: 0,
    second_player_tow_answer: 0,
    second_player_no_answer: 0,
    second_player_vertebrae_one: 0,
    second_player_vertebrae_two: 0,
  }), []);

  const [loadingGame, setLoadingGame] = useState(true);
  const [updatingGame, setUpdatingGame] = useState(false);
  const [currentGame, setCurrentGame] = useState({});
  const [currentYamaatScorePosition, setCurrentYamaatScorePosition] = useState("top");
  const [currentHorrorScorePositionNumber, setCurrentHorrorScorePositionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isVertebraeTry, setIsVertebraeTry] = useState(false);
  const [playingPlayer, setPlayingPlayer] = useState("first_player");
  const [yamaatGameMode, setYamaatGameMode] = useState("yamaat");
  const [currentGameState, setCurrentGameState] = useState(initialState);

  // Memoize axios instance with auth token and interceptors
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${authData.token}`,
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for rate limiting
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] || 1;
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return instance(error.config);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [authData.token]);

  // Memoize common request configs
  const requestConfig = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${authData.token}`,
      'Content-Type': 'application/json'
    }
  }), [authData.token]);

  useEffect(() => {
    const currGame = getCurrentGame();

    setCurrentGameState((prev) => ({
      categories: currGame.categories.map((category) => {
        return {
          id: category.id,
          viewed_question_points: category.viewed_question_points || [],
          viewed_question: category.viewed_question || [],
        };
      }),

      // First player
      first_player_points: currGame.first_player.points,
      first_player_al_jleeb: currGame.first_player.al_jleeb,
      first_player_tow_answer: currGame.first_player.tow_answer,
      first_player_no_answer: currGame.first_player.no_answer,
      first_player_vertebrae_one:
        currGame.first_player.first_player_vertebrae_one,
      first_player_vertebrae_two:
        currGame.first_player.first_player_vertebrae_two,

      // Second player
      second_player_points: currGame.second_player.points,
      second_player_al_jleeb: currGame.second_player.al_jleeb,
      second_player_tow_answer: currGame.second_player.tow_answer,
      second_player_no_answer: currGame.second_player.no_answer,
      second_player_vertebrae_one:
        currGame.second_player.second_player_vertebrae_one,
      second_player_vertebrae_two:
        currGame.second_player.second_player_vertebrae_two,
    }));
    setCurrentGame(currGame);
    setCurrentQuestion(getCurrentQuestion());
    setYamaatGameMode(currGame.type_of_game);
    setLoadingGame(false);
  }, []);

  const handleGetQuestion = useCallback(async (
    points,
    categoryID,
    gameID,
    scorePosition = "top",
    horrorScoreNumber = 1
  ) => {
    if (categoryID === 2) activateVertebraeTry();
    else deactivateVertebraeTry();

    setLoadingGame(true);

    const reqQuery = `points=${points}&category_id=${categoryID}&my_game_id=${gameID}&postion=${scorePosition}&numper=${horrorScoreNumber}`;

    try {
      const response = await requestQueue.add(() => 
        axiosInstance.get(`/get-question?${reqQuery}`)
      );
      
      if (response.data.status_code === 200) {
        const newQuestion = response.data.data;
        setCurrentQuestion(newQuestion);
        storeCurrentQuestion(newQuestion);
        router.push(
          categoryID != 1 ? "/yamaat-playground/game" : "/roab-playground/game"
        );
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoadingGame(false);
    }
  }, [axiosInstance, router, requestQueue]);

  const handleUpdateCurrentGameState = useCallback((key, value) => {
    if (value === 2) {
      if (Object.values(currentGameState).includes(value)) {
        return;
      } else if (!key.includes(playingPlayer)) {
        return;
      }
    }

    setCurrentGameState(prevState => {
      const newState = { ...prevState };
      newState[key] = value;

      if (key.includes("_points") && isVertebraeTry) {
        newState[
          currentQuestion.points === 400
            ? `${playingPlayer}_vertebrae_one`
            : `${playingPlayer}_vertebrae_two`
        ] = 1;
      }

      return newState;
    });

    setCurrentGame(prevGame => {
      const newGame = { ...prevGame };
      newGame.categories = newGame.categories.map((category) => ({
        ...category,
        viewed_question_points: currentGameState.categories.find(
          (c) => c.id === category.id
        ).viewed_question_points,
        viewed_question: currentGameState.categories.find(
          (c) => c.id === category.id
        ).viewed_question,
      }));

      newGame.first_player = {
        ...newGame.first_player,
        points: currentGameState.first_player_points,
        al_jleeb: currentGameState.first_player_al_jleeb,
        tow_answer: currentGameState.first_player_tow_answer,
        no_answer: currentGameState.first_player_no_answer,
        first_player_vertebrae_one: currentGameState.first_player_vertebrae_one,
        first_player_vertebrae_two: currentGameState.first_player_vertebrae_two,
      };

      newGame.second_player = {
        ...newGame.second_player,
        points: currentGameState.second_player_points,
        al_jleeb: currentGameState.second_player_al_jleeb,
        tow_answer: currentGameState.second_player_tow_answer,
        no_answer: currentGameState.second_player_no_answer,
        second_player_vertebrae_one: currentGameState.second_player_vertebrae_one,
        second_player_vertebrae_two: currentGameState.second_player_vertebrae_two,
      };

      storeCurrentGame(newGame);
      return newGame;
    });
  }, [currentGameState, playingPlayer, isVertebraeTry, currentQuestion]);

  const handlewinAljaleeb = useCallback((playerAnswered) => {
    if (
      currentGameState[playingPlayer + "_al_jleeb"] !== 2 ||
      playerAnswered !== playingPlayer
    )
      return;

    const newCurrentGameState = { ...currentGameState };
    const newCurrentGame = { ...currentGame };

    let loser =
      playingPlayer === "first_player" ? "second_player" : "first_player";

    newCurrentGameState[loser + "_points"] -= currentQuestion.points;
    newCurrentGame[loser] = {
      ...newCurrentGame[loser],
      points: newCurrentGameState[loser + "_points"],
    };

    newCurrentGameState[playingPlayer + "_points"] += currentQuestion.points;
    newCurrentGame[playingPlayer] = {
      ...newCurrentGame[playingPlayer],
      points: newCurrentGameState[playingPlayer + "_points"],
    };

    if (isVertebraeTry) {
      newCurrentGameState[
        currentQuestion.points === 400
          ? `${playingPlayer}_vertebrae_one`
          : `${playingPlayer}_vertebrae_two`
      ] = 1;
    }

    setCurrentGameState(newCurrentGameState);
    setCurrentGame(newCurrentGame);
    storeCurrentGame(newCurrentGame);
  }, [currentGameState, currentGame, playingPlayer, isVertebraeTry, currentQuestion]);

  const handleUpdateGameInBackend = useCallback(async () => {
    setUpdatingGame(true);

    const reqBody = {
      first_player_points: currentGameState.first_player_points || 0,
      first_player_al_jleeb: currentGameState.first_player_al_jleeb || 0,
      first_player_tow_answer: currentGameState.first_player_tow_answer || 0,
      first_player_no_answer: currentGameState.first_player_no_answer || 0,
      first_player_vertebrae_one: currentGameState.first_player_vertebrae_one || 0,
      first_player_vertebrae_two: currentGameState.first_player_vertebrae_two || 0,
      second_player_points: currentGameState.second_player_points || 0,
      second_player_al_jleeb: currentGameState.second_player_al_jleeb || 0,
      second_player_tow_answer: currentGameState.second_player_tow_answer || 0,
      second_player_no_answer: currentGameState.second_player_no_answer || 0,
      second_player_vertebrae_one: currentGameState.second_player_vertebrae_one || 0,
      second_player_vertebrae_two: currentGameState.second_player_vertebrae_two || 0,
      categories: currentGameState.categories.map(category => ({
        id: category.id || 0,
        viewed_question_points: category.viewed_question_points || [],
        viewed_question: category.viewed_question || []
      }))
    };

    try {
      const response = await requestQueue.add(() =>
        axiosInstance.post(`/games/${currentGame.id}`, reqBody)
      );
      
      if (response.data.status_code === 200) {
        console.log('Game updated successfully');
      }
    } catch (error) {
      console.error('Failed to update game:', error.response?.data || error.message);
    } finally {
      setUpdatingGame(false);
    }
  }, [currentGameState, currentGame.id, axiosInstance, requestQueue]);

  const handleStoreQuestionView = useCallback(async () => {
    let categoryId = currentQuestion.category_id;
    if (currentGame.type_of_game === "horror") categoryId = 1;
    else if (isVertebraeTry) categoryId = 2;

    try {
      await requestQueue.add(() =>
        axiosInstance.post('/store-question-view', {
          question_id: currentQuestion.id,
          my_game_id: currentGame.id,
          category_id: categoryId,
          postion: currentYamaatScorePosition,
          numper: currentHorrorScorePositionNumber,
        })
      );
    } catch (error) {
      console.error('Error storing question view:', error);
    }
  }, [currentQuestion, currentGame, isVertebraeTry, currentYamaatScorePosition, currentHorrorScorePositionNumber, axiosInstance, requestQueue]);

  const handleTurnPlayer = useCallback(() => {
    if (
      pathname !== "/yamaat-playground" &&
      pathname !== "/yamaat-playground/game/who-answered" &&
      pathname !== "/roab-playground" &&
      pathname !== "/roab-playground/game/who-answered"
    )
      return;

    setPlayingPlayer((prev) =>
      prev === "first_player" ? "second_player" : "first_player"
    );
  }, [pathname]);

  const activateVertebraeTry = () => {
    setIsVertebraeTry(true);
  };

  const deactivateVertebraeTry = () => {
    setIsVertebraeTry(false);
  };

  const handleSetCurrentYamaatScorePosition = useCallback((position) => {
    setCurrentYamaatScorePosition(position);
  }, []);

  const handleSetCurrentHorrorScorePositionNumber = useCallback((positionNumber) => {
    setCurrentHorrorScorePositionNumber(positionNumber);
  }, []);

  // Optimize context value
  const context = useMemo(() => ({
    updatingGame,
    loadingGame,
    currentGame,
    currentQuestion,
    currentGameState,
    playingPlayer,
    yamaatGameMode,
    isVertebraeTry,
    currentYamaatScorePosition,
    currentHorrorScorePositionNumber,
    getQuestion: handleGetQuestion,
    updateCurrentGameState: handleUpdateCurrentGameState,
    updateGameInBackend: handleUpdateGameInBackend,
    storeQuestionView: handleStoreQuestionView,
    turnPlayer: handleTurnPlayer,
    winAljaleeb: handlewinAljaleeb,
    setCurrentYamaatScorePosition: handleSetCurrentYamaatScorePosition,
    setCurrentHorrorScorePositionNumber: handleSetCurrentHorrorScorePositionNumber,
  }), [
    updatingGame,
    loadingGame,
    currentGame,
    currentQuestion,
    currentGameState,
    playingPlayer,
    yamaatGameMode,
    isVertebraeTry,
    currentYamaatScorePosition,
    currentHorrorScorePositionNumber,
    handleGetQuestion,
    handleUpdateCurrentGameState,
    handleUpdateGameInBackend,
    handleStoreQuestionView,
    handleTurnPlayer,
    handlewinAljaleeb,
    handleSetCurrentYamaatScorePosition,
    handleSetCurrentHorrorScorePositionNumber,
  ]);

  return (
    <PlaygroundContext.Provider value={context}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export default PlaygroundContext;
