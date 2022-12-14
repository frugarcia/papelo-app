export const PLAYERS_NAMES = [
  {name: "Fernando", nick: "F"},
  {name: "Pepe", nick: "P"},
  {name: "Victor", nick: "V"},
  {name: "Chico", nick: "X"},
  {name: "Postura", nick: "PO"},
  {name: "Bulli", nick: "B"},
  {name: "Curro", nick: "C"},
  {name: "V. Paquita", nick: "VP"},
];

export const PLAYERS: {
  [key: string]: {
    name: string;
    nick: string;
  };
} = {
  F: {name: "Fernando", nick: "F"},
  P: {name: "Pepe", nick: "P"},
  V: {name: "Victor", nick: "V"},
  X: {name: "Chico", nick: "X"},
  PO: {name: "Postura", nick: "PO"},
  B: {name: "Bulli", nick: "B"},
  C: {name: "Curro", nick: "C"},
  VP: {name: "V. Paquita", nick: "VP"},
};

export const GAMES_PRICES = [
  {value: 0, label: "Precio normal"},
  {value: 1, label: "Precio +1"},
  {value: 2, label: "Precio +2"},
  {value: 3, label: "Precio x2"},
  {value: 4, label: "Precio x3"},
  {value: 5, label: "Precio x5"},
];

export const GAME_STATUS = {
  PENDING: "PENDING",
  CONFIGURING: "CONFIGURING",
  CONFIRMING: "CONFIRMING",
  CONFIRMED: "CONFIRMED",
  STARTED: "STARTED",
};

export const CARDS_QTY: any = {
  3: 36,
  4: 40,
  5: 40,
  6: 36,
};

export const HANDS_TYPES: any = {
  LHD: {key: "LHD", label: "Grandes bajada"},
  SHD: {key: "SHD", label: "Bajada"},
  PH: {key: "PH", label: "Piñas"},
  SHU: {key: "SHU", label: "Subida"},
  LHU: {key: "LHU", label: "Grandes subida"},
  LLH: {key: "LLH", label: "Sin palo"},
  AUH: {key: "AUH", label: "Subasta"},
};

export const LIFES = ["Oros", "Copas", "Espadas", "Bastos"];
