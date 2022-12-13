import { Box, Text } from "@chakra-ui/react";

function Layout({ children }: any) {
  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        <Text fontWeight="bold" fontSize="lg">
          EL PAPELO
        </Text>
      </Box>
      {children}
    </>
  );
}

export default Layout;
