// Dependencies
import {Table, Tbody, Tr, TableContainer} from "@chakra-ui/react";
import TableCell from "./TableCell";

function TableCellHeader({children}: any) {
  return (
    <TableCell
      backgroundColor="blackAlpha.50"
      fontWeight="bold"
      textAlign="left"
    >
      {children}
    </TableCell>
  );
}

function TableCellBody({children}: any) {
  return <TableCell textAlign="left">{children}</TableCell>;
}

function InfoTable({data}: any) {
  return (
    <TableContainer width="100%">
      <Table variant="simple" size="sm" borderColor="gray.200" borderWidth={1}>
        <Tbody>
          <Tr>
            <TableCellHeader>Nº Jugadores</TableCellHeader>
            <TableCellBody>5 (40 cartas)</TableCellBody>
          </Tr>
          <Tr>
            <TableCellHeader>Tipo de partida</TableCellHeader>
            <TableCellBody>Completa + Sin Palo + Subasta</TableCellBody>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default InfoTable;
