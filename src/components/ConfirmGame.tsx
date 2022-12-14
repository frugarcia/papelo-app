// Dependencies
import { useContext, useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import GameContext from "../context/GameContext";
import { GAMES_PRICES } from "../constants";
import TagAvatar from "./TagAvatar";
import { getPlayerByNick } from "../lib/utils";

function ConfigGame() {
  const { handleConfirmGame, handleUpdateConfigGame, gameData } =
    useContext(GameContext);

  const playersList = useMemo(() => {
    return (
      gameData?.players?.map((item: any) => getPlayerByNick(item.nick)) || []
    );
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
          <Flex flexWrap="wrap">
            {playersList.map((item: any) => {
              return (
                <TagAvatar
                  key={item.nick}
                  mr={2}
                  mt={2}
                  name={`${item.name} (${item.nick})`}
                />
              );
            })}
          </Flex>
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
          Volver atrás
        </Button>
        <Button onClick={handleConfirmGame} size="sm" colorScheme="blue">
          Siguiente
        </Button>
      </HStack>
    </Box>
  );
}

export default ConfigGame;
