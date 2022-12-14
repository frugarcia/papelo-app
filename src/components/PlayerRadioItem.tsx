// Dependencies
import {Icon, HStack, Text, Button} from "@chakra-ui/react";
import {IoMdPerson} from "react-icons/io";

function PlayerRadioItem({name, ...rest}: any) {
  return (
    <HStack
      justifyContent="flex-start"
      as={Button}
      width="100%"
      spacing={1}
      borderWidth={4}
      borderRadius="full"
      py={5}
      px={2}
      backgroundColor="gray.100"
      borderColor="gray.300"
      {...rest}
    >
      <Icon w={8} h={8} as={IoMdPerson} color="gray.600" mr={2} />
      <Text fontSize="md" color="gray.700">
        {name}
      </Text>
    </HStack>
  );
}

export default PlayerRadioItem;
