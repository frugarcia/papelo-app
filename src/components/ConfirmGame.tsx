// Dependencies
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import GameContext from "../context/GameContext";

function ConfigGame() {
  const { handleConfirmGameData, handleUpdateGameData } =
    useContext(GameContext);

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
          <Text fontSize="sm">Papelo normal + Subastas + Sin palo</Text>
        </VStack>
        <Divider my={2} />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            Jugadores:
          </Text>
          <Text fontSize="sm">Papelo normal + Subastas + Sin palo</Text>
        </VStack>
        <Divider my={2} />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            Precio de la partida:
          </Text>
          <Text fontSize="sm">Papelo normal + Subastas + Sin palo</Text>
        </VStack>
      </VStack>
      <HStack width="100%" justifyContent="space-between" marginTop={5}>
        <Button onClick={handleConfirmGameData} size="sm" colorScheme="blue">
          Confirmar partida
        </Button>
        <Button onClick={handleUpdateGameData} size="sm" colorScheme="orange">
          Modificar configuración
        </Button>
      </HStack>
    </Box>
  );
}

export default ConfigGame;
