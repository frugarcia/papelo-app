// Dependencies
import { Button, HStack, VStack, Container } from "@chakra-ui/react";
import { useContext } from "react";
import ConfigGame from "./components/ConfigGame";
import ConfirmGame from "./components/ConfirmGame";
import InfoTable from "./components/InfoTable";
import ScoreTable from "./components/ScoreTable";
import GameContext from "./context/GameContext";

// [puntos, cogidas, ha acertado, ha vetado]

const data = [
  [
    "Nº",
    "P",
    { label: "F", colSpan: 2, position: 1 },
    { label: "P", colSpan: 2, position: 2 },
    { label: "PO", colSpan: 2, position: 3 },
    { label: "X", colSpan: 2, position: 4 },
    { label: "B", colSpan: 2, position: 5 },
    { label: "B", colSpan: 2, position: 6 },
  ],
  [
    [
      "P",
      8,
      [13, 1, true, false],
      [16, 1, true, false],
      [10, 10, true, false],
      [19, 1, true, false],
      [-3, 1, false, false],
      [-3, 1, false, false],
    ],
    [
      "PO",
      8,
      [485, 10, true, false],
      [321, 10, true, false],
      [325, 6, true, true],
      [888, 10, false, false],
      [958, 2, true, false],
      [475, 7, true, false],
    ],
  ],
];

function App() {
  const {
    creatingGame,
    confirmingGame,
    startGame,
    handleCancelGame,
    handleNewGame,
  } = useContext(GameContext);
  return (
    <Container maxW="container.xxl">
      <VStack spacing={3} my={5}>
        <HStack width="100%" justifyContent="space-between">
          {!creatingGame || !confirmingGame || !startGame ? (
            <Button size="sm" onClick={handleNewGame}>
              Nueva partida
            </Button>
          ) : null}
          {startGame ? (
            <Button size="sm" onClick={handleCancelGame}>
              Cancelar partida
            </Button>
          ) : null}
        </HStack>
        {creatingGame ? <ConfigGame /> : null}
        {confirmingGame ? <ConfirmGame /> : null}
      </VStack>
      <InfoTable data={data} />
      <ScoreTable data={data} />
    </Container>
  );
}

export default App;
