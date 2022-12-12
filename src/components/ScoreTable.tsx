// Dependencies
import {Table, Thead, Tbody, Tr, Th, TableContainer} from "@chakra-ui/react";
import {Fragment} from "react";
import TableCell from "./TableCell";

function ScoreTable({data}: any) {
  return (
    <TableContainer w="100%">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {data[0].map((item: any, index: number) => {
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
                >
                  {label}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data[1].map((row: any, index: number) => {
            return (
              <Tr key={`row_${index}`}>
                {row.map((item: any, index: number) => {
                  if (Array.isArray(item)) {
                    const isRight = item[2];
                    const isChanged = item[3];
                    return (
                      <Fragment key={`detail_${index}`}>
                        <TableCell color={isRight ? "green.500" : "red.500"}>
                          {item[0]}
                        </TableCell>
                        <TableCell
                          padding={0}
                          width="30px"
                          fontSize="sm"
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
