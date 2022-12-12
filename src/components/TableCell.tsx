// Dependencies
import {Td} from "@chakra-ui/react";

function TableCell({children, ...rest}: any) {
  return (
    <Td textAlign="center" borderWidth={1} borderColor="gray.400" {...rest}>
      {children}
    </Td>
  );
}

export default TableCell;
