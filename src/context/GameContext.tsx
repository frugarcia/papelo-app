// Dependencies
import {useDisclosure} from "@chakra-ui/react";
import React, {useState} from "react";
import AlertDialog from "../components/AlertDialog";
import {GAME_STATUS, PLAYERS} from "../constants";
import {getGameSchema} from "../lib/utils";

type AuthContextValueType = {
  handleConfigGame: (values: any) => void;
  handleCancelGame: () => void;
  handleConfirmGame: () => void;
  handleNewGame: () => void;
  handleUpdateConfigGame: () => void;
  handleBackDependentPlayer: () => void;
  handleStartedGame: (dp: string) => void;
  gameData: any;
  gameStatus: string;
};

const GameContext = React.createContext({} as AuthContextValueType);

export const GameContextProvider = ({children}: any) => {
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PENDING);
  const [gameData, setGameData] = useState<any>(null);

  function handleConfigGame(values: any) {
    setGameStatus(GAME_STATUS.CONFIRMING);
    setGameData({
      ...values,
      players: values?.players?.map((item: any) => PLAYERS[item.nick]),
    });
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
  const handleBackDependentPlayer = () => setGameStatus(GAME_STATUS.CONFIRMING);

  const handleStartedGame = (startDependentPlayer: string) => {
    setGameStatus(GAME_STATUS.STARTED);

    const schema = getGameSchema({...gameData, startDependentPlayer});

    console.log(gameData);

    setGameData((gameData: any) => ({
      startDependentPlayer,
      schema,
      ...gameData,
    }));
  };

  return (
    <GameContext.Provider
      value={{
        handleConfigGame,
        handleCancelGame: prevHandleCancelGame,
        handleConfirmGame,
        handleNewGame,
        handleUpdateConfigGame,
        handleBackDependentPlayer,
        handleStartedGame,
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
