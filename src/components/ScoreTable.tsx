// Dependencies
import {Table, Thead, Tbody, Tr, Th, TableContainer} from "@chakra-ui/react";
import {Fragment, useContext} from "react";
import GameContext from "../context/GameContext";
import TableCell from "./TableCell";

// [puntos, cogidas, ha acertado, ha vetado]

/*
const data = [
  [
    "Nº",
    "P",
    {label: "F", colSpan: 2, position: 1},
    {label: "P", colSpan: 2, position: 2},
    {label: "PO", colSpan: 2, position: 3},
    {label: "X", colSpan: 2, position: 4},
    {label: "B", colSpan: 2, position: 5},
    {label: "B", colSpan: 2, position: 6},
  ],
  [
    [
      "P",
      8,
      [13, 1, true, false],
      [16, 1, true, false],
      [10, 10, true, false],
      [19, 1, true, false],
      [-3, 1, false, false],
      [-3, 1, false, false],
    ],
    [
      "PO",
      8,
      [485, 10, true, false],
      [321, 10, true, false],
      [325, 6, true, true],
      [888, 10, false, false],
      [958, 2, true, false],
      [475, 7, true, false],
    ],
  ],
];
*/

function ScoreTable() {
  const {gameData} = useContext(GameContext);

  const headers = [
    "Nº",
    "P",
    ...gameData.players.map((o: any) => ({label: o.nick, colSpan: 2})),
  ];

  const body = gameData.schema.map((o: any) => {
    return [
      o.qty,
      o.dependent.nick,
      ...Array.from({length: gameData.players.length}, () => [
        0,
        0,
        true,
        false,
      ]),
    ];
  });

  return (
    <TableContainer w="100%">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {headers.map((item: any, index: number) => {
              const label = typeof item === "string" ? item : item.label;
              const colSpan =
                typeof item !== "string" ? item?.colSpan : undefined;

              return (
                <Th
                  backgroundColor="blackAlpha.50"
                  textAlign="center"
                  colSpan={colSpan}
                  borderWidth={1}
                  borderColor="blackAlpha.500"
                  key={index}
                  fontWeight="bold"
                  textColor="black"
                  py={4}
                  padding={1}
                >
                  {label}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {body.map((row: any, index: number) => {
            return (
              <Tr key={`row_${index}`}>
                {row.map((item: any, index: number) => {
                  if (Array.isArray(item)) {
                    const isRight = item[2];
                    const isChanged = item[3];
                    return (
                      <Fragment key={`detail_${index}`}>
                        <TableCell
                          color={isRight ? "green.500" : "red.500"}
                          padding={1}
                          fontSize="xs"
                        >
                          {item[0]}
                        </TableCell>
                        <TableCell
                          padding={1}
                          width="20px"
                          fontSize="10"
                          key={`detail_${index}`}
                          backgroundColor={isChanged ? "blue.50" : undefined}
                        >
                          {item[1]}
                        </TableCell>
                      </Fragment>
                    );
                  }
                  return (
                    <TableCell
                      backgroundColor="blackAlpha.50"
                      key={`detail_${index}`}
                      padding={1}
                      fontSize="xs"
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ScoreTable;
