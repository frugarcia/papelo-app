// Dependencies
import {useContext, useMemo} from "react";
import {
  Button,
  Divider,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import GameContext from "../context/GameContext";
import {getGameSchema} from "../lib/utils";
import {useForm, useController} from "react-hook-form";
import PlayerRadioItem from "./PlayerRadioItem";
import {PLAYERS} from "../constants";

const schema = yup.object().shape({
  dependentPlayer: yup.string().required("Debe seleccionar un jugador"),
});

function DependentPlayer() {
  const {gameData, handleBackDependentPlayer, handleStartedGame} =
    useContext(GameContext);
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const {field, fieldState} = useController({
    control,
    name: "dependentPlayer",
    defaultValue: "",
  });

  function handleChangePlayer(nick: string) {
    field.onChange(nick !== field.value ? nick : "");
  }

  function onSubmit(values: any) {
    handleStartedGame(values?.dependentPlayer);

    const a = {
      startDependentPlayer: values?.dependentPlayer,
      ...gameData,
    };

    const b = getGameSchema(a);
    console.log(b);
  }

  const playersList = useMemo(() => {
    return gameData?.players?.map((item: any) => PLAYERS[item.nick]) || [];
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
        ¿Quien es el primer puteado?
      </Text>
      <SimpleGrid
        w="100%"
        columns={{
          base: 1,
          md: 2,
          xl: 4,
        }}
        spacing={4}
      >
        {playersList.map((item: any) => {
          return (
            <PlayerRadioItem
              borderColor={field.value === item.nick && "green.400"}
              onClick={() => handleChangePlayer(item.nick)}
              key={item.nick}
              name={`${item.name} (${item.nick})`}
            />
          );
        })}
      </SimpleGrid>
      <FormControl isInvalid={fieldState?.invalid}>
        <FormErrorMessage>
          <FormErrorIcon />
          {fieldState?.error?.message}
        </FormErrorMessage>
      </FormControl>
      <Divider />
      <HStack width="100%" justifyContent="space-between" marginTop={5}>
        <Button
          onClick={handleBackDependentPlayer}
          size="sm"
          colorScheme="orange"
        >
          Volver atrás
        </Button>
        <Button onClick={handleSubmit(onSubmit)} size="sm" colorScheme="green">
          Comenzar a jugar
        </Button>
      </HStack>
    </VStack>
  );
}

export default DependentPlayer;
