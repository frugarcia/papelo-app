// Dependencies
import { Tag, TagLabel, Icon } from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";

function TagAvatar({ name, ...rest }: any) {
  return (
    <Tag size="md" colorScheme="gray" borderRadius="full" {...rest}>
      <Icon as={IoMdPerson} mr={2} />
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
}

export default TagAvatar;
