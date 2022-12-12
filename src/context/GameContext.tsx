// Dependencies
import React, {useState} from "react";

type AuthContextValueType = {
  handleSaveGameData: (values: any) => void;
  handleConfirmGameData: () => void;
  handleCancelGame: () => void;
  handleNewGame: () => void;
  handleUpdateGameData: () => void;
  gameData: any;
  creatingGame: boolean;
  confirmingGame: boolean;
  startGame: boolean;
};

const GameContext = React.createContext({} as AuthContextValueType);

export const GameContextProvider = ({children}: any) => {
  const [creatingGame, setCreatingGame] = useState(false);
  const [confirmingGame, setConfirmingGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameData, setGameData] = useState(null);

  function handleSaveGameData(values: any) {
    setCreatingGame(false);
    setConfirmingGame(true);
    setGameData(values);
  }

  function handleConfirmGameData() {
    setConfirmingGame(false);
    setStartGame(true);
  }

  function handleUpdateGameData() {
    setCreatingGame(true);
    setConfirmingGame(false);
  }

  function handleCancelGame() {
    console.log("juego cancelado");
  }
  function handleNewGame() {
    setCreatingGame(true);
  }

  console.log(gameData);

  return (
    <GameContext.Provider
      value={{
        handleSaveGameData,
        handleConfirmGameData,
        handleCancelGame,
        handleNewGame,
        handleUpdateGameData,
        gameData,
        creatingGame,
        confirmingGame,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
