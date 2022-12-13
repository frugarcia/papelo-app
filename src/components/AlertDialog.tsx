// Dependencies
import {useRef} from "react";
import {
  AlertDialog as AlertDialogChakra,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

function AlertDialog({isOpen, onClose, onSuccess}: any) {
  const cancelRef = useRef<any>();

  return (
    <AlertDialogChakra
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cancelar partida
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Esta seguro que desea cancelar la partida? Esta operación no podrá
            deshacerse
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No cancelar
            </Button>
            <Button colorScheme="red" onClick={onSuccess} ml={3}>
              Cancelar partida
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialogChakra>
  );
}

export default AlertDialog;
