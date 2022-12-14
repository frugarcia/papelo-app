// Dependencies
import {
  CARDS_QTY,
  HANDS_TYPES,
  LIFES,
  PLAYERS,
  PLAYERS_NAMES,
} from "../constants";

export function getPlayerByNick(nick: string) {
  return PLAYERS_NAMES.find((item) => item.nick === nick);
}

export function getGameSchema(data: any) {
  const {players} = data;
  const playersLength = players.length;
  const cards = CARDS_QTY[playersLength];
  const handsByLife = LIFES.length;

  let gameSchema: any[] = [];

  Object.keys(HANDS_TYPES).forEach((orderKey) => {
    const secureHands = cards / playersLength - 3;
    const typeHand = HANDS_TYPES[orderKey];

    let bufferHands: any[] = [];
    if (orderKey === "LHD") {
      bufferHands = Array.from({length: handsByLife}, (_, i) => ({
        qty: cards / playersLength,
        life: LIFES[i],
        typeHand,
      }));
    }

    if (orderKey === "SHD") {
      bufferHands = Array.from({length: secureHands}, (_, i) => ({
        qty: cards / playersLength - 1 - i,
        typeHand,
      }));
    }

    if (orderKey === "PH") {
      const lifeHands = Array.from({length: handsByLife}, (_, i) => ({
        qty: 1,
        life: LIFES[i],
        typeHand,
      }));
      bufferHands = !data.pineapple
        ? [{qty: 2, typeHand}, ...lifeHands, {qty: 2, typeHand}]
        : [];
    }

    if (orderKey === "SHU") {
      bufferHands = Array.from({length: secureHands}, (_, i) => ({
        qty: cards / playersLength - secureHands + i,
        typeHand,
      }));
    }

    if (orderKey === "LHU") {
      bufferHands = Array.from({length: handsByLife}, (_, i) => ({
        qty: cards / playersLength,
        life: LIFES[i],
        typeHand,
      }));
    }

    if (orderKey === "LLH") {
      bufferHands = Array.from(
        {length: data.lifeless ? playersLength : 0},
        () => ({qty: cards / playersLength, typeHand})
      );
    }

    if (orderKey === "AUH") {
      bufferHands = Array.from(
        {length: data.auction ? playersLength : 0},
        () => ({qty: cards / playersLength, typeHand})
      );
    }
    gameSchema.push(...bufferHands);
  });

  let letterIndex = players
    .map((item: any) => item.nick)
    .indexOf(data.startDependentPlayer);

  return gameSchema?.map((item) => {
    const player = players[letterIndex];
    letterIndex = letterIndex === playersLength - 1 ? 0 : letterIndex + 1;

    return {
      ...item,
      dependent: PLAYERS[player.nick],
    };
  });
}
