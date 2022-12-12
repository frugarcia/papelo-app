// Dependencies
import {
  Box,
  Button,
  HStack,
  VStack,
  Container,
  useConst,
} from "@chakra-ui/react";
import {useContext} from "react";
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
    {label: "Fer (F)", colSpan: 2, position: 1},
    {label: "Pepe (P)", colSpan: 2, position: 2},
    {label: "Postura (PO)", colSpan: 2, position: 3},
    {label: "Chico (X)", colSpan: 2, position: 4},
    {label: "Bulli (B)", colSpan: 2, position: 5},
  ],
  [
    [
      "P",
      8,
      [13, 1, true, false],
      [16, 1, true, false],
      [10, 1, true, false],
      [19, 1, true, false],
      [-3, 1, false, false],
    ],
    [
      "PO",
      8,
      [29, 1, true, false],
      [29, 1, true, false],
      [23, 1, true, true],
      [16, 1, false, false],
      [10, 1, true, false],
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

        {/* <InfoTable data={data} />
        <ScoreTable data={data} /> */}
      </VStack>
    </Container>
  );
}

export default App;
