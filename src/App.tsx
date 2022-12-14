// Dependencies
import {Button, HStack, VStack, Container} from "@chakra-ui/react";
import {useContext} from "react";
import ConfigGame from "./components/ConfigGame";
import ConfirmGame from "./components/ConfirmGame";
import DependentPlayer from "./components/DependentPlayer";
import Layout from "./components/Layout";
import ScoreTable from "./components/ScoreTable";
import {GAME_STATUS} from "./constants";
import GameContext from "./context/GameContext";

function App() {
  const {gameStatus, handleCancelGame, handleNewGame} = useContext(GameContext);
  return (
    <Layout>
      <Container maxW="container.xxl">
        <VStack spacing={3} my={5}>
          <HStack width="100%" justifyContent="space-between">
            {gameStatus === GAME_STATUS.PENDING ? (
              <Button size="sm" colorScheme="green" onClick={handleNewGame}>
                Nueva partida
              </Button>
            ) : null}
            {gameStatus !== GAME_STATUS.PENDING ? (
              <Button size="sm" colorScheme="red" onClick={handleCancelGame}>
                Cancelar partida
              </Button>
            ) : null}
          </HStack>
          {gameStatus === GAME_STATUS.CONFIGURING ? <ConfigGame /> : null}
          {gameStatus === GAME_STATUS.CONFIRMING ? <ConfirmGame /> : null}
          {gameStatus === GAME_STATUS.CONFIRMED ? <DependentPlayer /> : null}
          {gameStatus === GAME_STATUS.STARTED ? <ScoreTable /> : null}
        </VStack>
      </Container>
    </Layout>
  );
}

export default App;
