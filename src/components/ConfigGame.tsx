// Dependencies
import {useContext, useMemo} from "react";
import {useForm} from "react-hook-form";
import {
  Box,
  Text,
  VStack,
  Button,
  Divider,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import PlayersFormControl from "./PlayersFormControl";
import SwitchForm from "./SwitchForm";
import GameContext from "../context/GameContext";

const schema = yup.object().shape({
  players: yup
    .array()
    .transform((value) => value.filter((item: any) => item))
    .min(3, "Debe introducir como mínimo 3 jugadores")
    .max(6, "Puede introducir como máximo 6 jugadores")
    .required("Debe introducir jugadores"),
});

function ConfigGame() {
  const {handleSaveGameData, gameData} = useContext(GameContext);

  const defaultValues = useMemo(() => {
    return {
      players: gameData?.players ?? [],
      pineapple: gameData?.pineapple ?? false,
      lifeless: gameData?.lifeless ?? true,
      auction: gameData?.auction ?? true,
      double_gold: gameData?.double_gold ?? true,
    };
  }, [gameData]);

  function onSubmit(values: any) {
    handleSaveGameData({
      players: values.players,
      auction: values.auction,
      double_gold: values.double_gold,
      lifeless: values.lifeless,
      pineapple: values.pineapple,
    });
  }

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const errors: any = form?.formState?.errors;

  return (
    <Box width="100%" borderColor="gray.400" borderWidth={0.5} py={5} px={5}>
      <Text fontWeight="bold" pb={4}>
        Configuración de la partida
      </Text>
      <form>
        <VStack alignItems="flex-start" spacing={5}>
          <PlayersFormControl form={form} errors={errors} />
          <Divider />
          <SimpleGrid
            w="100%"
            columns={{
              base: 3,
              md: 4,
            }}
            spacing={5}
          >
            <SwitchForm
              control={form.control}
              name="pineapple"
              label="No piñas"
            />
            <SwitchForm
              control={form.control}
              name="lifeless"
              label="Sin palo"
            />
            <SwitchForm
              control={form.control}
              name="auction"
              label="Subastas"
            />
            <SwitchForm
              control={form.control}
              name="double_gold"
              label="Doble oro"
            />
          </SimpleGrid>
          <Divider />
          {Boolean(errors.players) ? (
            <Alert status="error">
              <AlertIcon />
              <Text fontSize="sm">{errors?.players?.message}</Text>
            </Alert>
          ) : null}
          <Button
            onClick={form.handleSubmit(onSubmit)}
            size="sm"
            colorScheme="blue"
          >
            Crear partida
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default ConfigGame;
