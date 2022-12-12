// Dependencies
import {Controller, useFieldArray} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Text,
  Select,
  VStack,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {PLAYERS_NAMES} from "../constants";

function PlayerFormControl({
  form,
  availablePlayers,
  handleChangePlayer,
  value,
  idx,
}: any) {
  const {control} = form;
  return (
    <FormControl>
      <FormLabel htmlFor={`player_${idx}`} fontSize="sm">
        {`Jugador ${idx + 1}`}
      </FormLabel>
      <Controller
        name={`player_${idx}`}
        control={control}
        render={() => {
          return (
            <Select
              size="sm"
              id={`player_${idx}`}
              placeholder="Seleccione una opción..."
              onChange={(ev) => handleChangePlayer(idx, ev.target.value)}
              value={value}
            >
              {availablePlayers.map((item: any) => {
                return (
                  <option
                    disabled={item.disabled}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                );
              })}
            </Select>
          );
        }}
      />
    </FormControl>
  );
}

function PlayersFormControl({form}: any) {
  const {control} = form;
  const {fields, append, update, remove} = useFieldArray({
    control,
    name: "players",
  });

  function handleChangePlayer(playerIndex: number, nick: string) {
    if (nick) {
      update(playerIndex, {nick});
    } else {
      remove(playerIndex);
    }
  }

  const availablePlayers: any[] = PLAYERS_NAMES.map((player) => {
    const usedNicks = fields.map((field: any) => field?.nick);
    const isUsedPlayer = usedNicks.includes(player.nick);
    return {value: player.nick, label: player.name, disabled: isUsedPlayer};
  });

  return (
    <VStack width="100%" spacing={4} alignItems="flex-start">
      <Alert status="warning">
        <AlertIcon />
        <Text fontSize="sm">
          Asegurese de poner el orden de los jugadores de izquierda a derecha
        </Text>
      </Alert>
      <Button
        disabled={fields.length > 5}
        colorScheme="green"
        size="sm"
        onClick={() => append(undefined)}
      >
        Añadir jugador
      </Button>
      <SimpleGrid
        columns={{
          base: 2,
          md: 3,
        }}
        width="100%"
        spacing={5}
      >
        {!fields.length ? (
          <PlayerFormControl
            form={form}
            idx={0}
            availablePlayers={availablePlayers}
            handleChangePlayer={handleChangePlayer}
            value={undefined}
          />
        ) : (
          fields.map((player: any, index: number) => {
            return (
              <PlayerFormControl
                key={player.id}
                form={form}
                idx={index}
                availablePlayers={availablePlayers}
                handleChangePlayer={handleChangePlayer}
                value={player.nick}
              />
            );
          })
        )}
      </SimpleGrid>
    </VStack>
  );
}

export default PlayersFormControl;
