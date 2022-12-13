// Dependencies
import {useDisclosure} from "@chakra-ui/react";
import React, {useState} from "react";
import AlertDialog from "../components/AlertDialog";

type AuthContextValueType = {
  handleConfigGame: (values: any) => void;
  handleCancelGame: () => void;
  handleConfirmGame: () => void;
  handleNewGame: () => void;
  handleUpdateConfigGame: () => void;
  gameData: any;
  gameStatus: string;
};

const GameContext = React.createContext({} as AuthContextValueType);

export const GAME_STATUS = {
  PENDING: "PENDING",
  CONFIGURING: "CONFIGURING",
  CONFIRMING: "CONFIRMING",
  CONFIRMED: "CONFIRMED",
  STARTED: "STARTED",
};

export const GameContextProvider = ({children}: any) => {
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PENDING);
  const [gameData, setGameData] = useState(null);

  function handleConfigGame(values: any) {
    setGameStatus(GAME_STATUS.CONFIRMING);
    setGameData(values);
  }

  function handleCancelGame() {
    setGameStatus(GAME_STATUS.PENDING);
    setGameData(null);
    alertOnClose();
  }

  const handleConfirmGame = () => setGameStatus(GAME_STATUS.CONFIRMED);
  const handleUpdateConfigGame = () => setGameStatus(GAME_STATUS.CONFIGURING);
  const handleNewGame = () => setGameStatus(GAME_STATUS.CONFIGURING);
  const prevHandleCancelGame = () => alertOnOpen();

  return (
    <GameContext.Provider
      value={{
        handleConfigGame,
        handleCancelGame: prevHandleCancelGame,
        handleConfirmGame,
        handleNewGame,
        handleUpdateConfigGame,
        gameData,
        gameStatus,
      }}
    >
      {children}
      <AlertDialog
        isOpen={alertIsOpen}
        onClose={alertOnClose}
        onSuccess={handleCancelGame}
      />
    </GameContext.Provider>
  );
};

export default GameContext;
