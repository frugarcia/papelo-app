// Dependencies
import { useContext, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Text,
  VStack,
  Button,
  Divider,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  FormErrorIcon,
  Flex,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PlayersFormControl from "./PlayersFormControl";
import SwitchForm from "./SwitchForm";
import GameContext from "../context/GameContext";
import { GAMES_PRICES } from "../constants";

const schema = yup.object().shape({
  players: yup
    .array()
    .transform((value) => value.filter((item: any) => item))
    .min(3, "Debe introducir como mínimo 3 jugadores")
    .max(6, "Puede introducir como máximo 6 jugadores")
    .required("Debe introducir jugadores"),
  type_pay: yup.string().required("Debe seleccionar un tipo"),
});

function ConfigGame() {
  const { handleConfigGame, gameData } = useContext(GameContext);

  const defaultValues = useMemo(() => {
    return {
      players: gameData?.players ?? [],
      pineapple: gameData?.pineapple ?? false,
      lifeless: gameData?.lifeless ?? true,
      auction: gameData?.auction ?? true,
      double_gold: gameData?.double_gold ?? false,
      type_pay: gameData?.type_pay ?? "",
    };
  }, [gameData]);

  function onSubmit(values: any) {
    handleConfigGame({
      players: values.players,
      auction: values.auction,
      double_gold: values.double_gold,
      lifeless: values.lifeless,
      pineapple: values.pineapple,
      type_pay: values.type_pay,
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
          <FormControl isRequired={true} isInvalid={errors?.type_pay}>
            <FormLabel htmlFor="type_pay" fontSize="sm">
              Tipo de pago
            </FormLabel>
            <Controller
              name="type_pay"
              control={form.control}
              render={({ field }) => {
                return (
                  <Select
                    size="sm"
                    id="type_pay"
                    placeholder="Seleccione una opción..."
                    onChange={field.onChange}
                    value={field.value}
                  >
                    {GAMES_PRICES.map((item: any) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </Select>
                );
              }}
            />

            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.type_pay?.message}
            </FormErrorMessage>
          </FormControl>
          <Divider />
          <Flex width="100%" justifyContent="flex-end">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              size="sm"
              colorScheme="green"
            >
              Siguiente
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default ConfigGame;
