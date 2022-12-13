// Dependencies
import {useContext, useMemo} from "react";
import {Box, Button, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import GameContext from "../context/GameContext";
import {PLAYERS_NAMES, GAMES_PRICES} from "../constants";

function getPlayerNameByNick(nick: string, players: any[]) {
  return players?.find((item) => item.nick === nick)?.name;
}

function ConfigGame() {
  const {handleConfirmGame, handleUpdateConfigGame, gameData} =
    useContext(GameContext);

  const playersList = useMemo(() => {
    const players: string[] = gameData?.players?.map((item: any) => {
      return getPlayerNameByNick(item?.nick, PLAYERS_NAMES);
    });
    const formatter = new Intl.ListFormat("es", {
      style: "long",
      type: "conjunction",
    });
    return formatter.format(players);
  }, [gameData]);

  const gameTypeString = useMemo(() => {
    const mainName = gameData?.pineapple ? "Papelo sin piñas" : "Papelo normal";
    const auctionText = gameData?.auction ? " + Subasta" : "";
    const lifelessText = gameData?.lifeless ? " + Sin palo" : "";
    const doubleGoldText = gameData?.double_gold ? " + Doble oro" : "";
    return `${mainName}${lifelessText}${auctionText}${doubleGoldText}`;
  }, [gameData]);

  const gamePrice = useMemo(() => {
    return GAMES_PRICES?.find(
      (item) => item?.value?.toString() === gameData?.type_pay
    )?.label;
  }, [gameData]);

  return (
    <Box width="100%" borderColor="gray.400" borderWidth={0.5} py={5} px={5}>
      <Text fontWeight="bold" pb={4}>
        Confirmación de la partida
      </Text>
      <VStack alignItems="flex-start">
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            Tipo de partida:
          </Text>
          <Text fontSize="sm">{gameTypeString}</Text>
        </VStack>
        <Divider my={2} />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            Jugadores:
          </Text>
          <Text fontSize="sm">{playersList}</Text>
        </VStack>
        <Divider my={2} />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            Precio de la partida:
          </Text>
          <Text fontSize="sm">{gamePrice}</Text>
        </VStack>
      </VStack>
      <HStack width="100%" justifyContent="space-between" marginTop={5}>
        <Button onClick={handleUpdateConfigGame} size="sm" colorScheme="orange">
          Modificar configuración
        </Button>
        <Button onClick={handleConfirmGame} size="sm" colorScheme="blue">
          Confirmar partida
        </Button>
      </HStack>
    </Box>
  );
}

export default ConfigGame;
