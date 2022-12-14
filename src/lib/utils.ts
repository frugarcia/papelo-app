// Dependencies
import { PLAYERS_NAMES } from "../constants";

export function getPlayerByNick(nick: string) {
  return PLAYERS_NAMES.find((item) => item.nick === nick);
}
