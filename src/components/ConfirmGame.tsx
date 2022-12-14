// Dependencies
import {useContext, useMemo} from "react";
import {Button, Divider, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import GameContext from "../context/GameContext";
import {GAMES_PRICES, PLAYERS} from "../constants";
import TagAvatar from "./TagAvatar";

function ConfigGame() {
  const {handleConfirmGame, handleUpdateConfigGame, gameData} =
    useContext(GameContext);

  const playersList = useMemo(() => {
    return gameData?.players?.map((item: any) => PLAYERS[item.nick]) || [];
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
    <VStack
      width="100%"
      alignItems="flex-start"
      borderColor="gray.400"
      borderWidth={0.5}
      py={5}
      px={5}
      spacing={5}
      borderRadius={10}
    >
      <Text fontSize="xl" fontWeight="bold">
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
                  mr={3}
                  mt={4}
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
        <Button onClick={handleConfirmGame} size="sm" colorScheme="green">
          Siguiente
        </Button>
      </HStack>
    </VStack>
  );
}

export default ConfigGame;
