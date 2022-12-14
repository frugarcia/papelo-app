// Dependencies
import { useContext, useMemo } from "react";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GameContext from "../context/GameContext";
import TagAvatar from "./TagAvatar";
import { getPlayerByNick } from "../lib/utils";
import { useForm, useController } from "react-hook-form";

const schema = yup.object().shape({
  dependentPlayer: yup.string().required("Debe seleccionar un jugador"),
});

function DependentPlayer() {
  const { gameData } = useContext(GameContext);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { field, fieldState } = useController({
    control,
    name: "dependentPlayer",
    defaultValue: "",
  });

  function handleChangePlayer(nick: string) {
    field.onChange(nick !== field.value ? nick : "");
    console.log(nick);
  }

  function onSubmit(values: any) {
    console.log(values);
  }

  const playersList = useMemo(() => {
    return (
      gameData?.players?.map((item: any) => getPlayerByNick(item.nick)) || []
    );
  }, [gameData]);

  return (
    <Box width="100%" borderColor="gray.400" borderWidth={0.5} py={5} px={5}>
      <Text fontWeight="bold" pb={4}>
        ¿Quien es el primer puteado?
      </Text>
      <VStack spacing={3}>
        {playersList.map((item: any) => {
          return (
            <TagAvatar
              colorScheme={field.value === item.nick ? "green" : "gray"}
              onClick={() => handleChangePlayer(item.nick)}
              key={item.nick}
              name={`${item.name} (${item.nick})`}
            />
          );
        })}
      </VStack>
      <HStack width="100%" justifyContent="space-between" marginTop={5}>
        <Button
          onClick={() => console.log("volver atras")}
          size="sm"
          colorScheme="orange"
        >
          Volver atrás
        </Button>
        <Button onClick={handleSubmit(onSubmit)} size="sm" colorScheme="blue">
          Comenzar a jugar
        </Button>
      </HStack>
    </Box>
  );
}

export default DependentPlayer;
