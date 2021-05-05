import React, { ReactNode } from "react";
import { Stack, useColorMode } from "@chakra-ui/react";

interface CardsContainerProps {
  children: ReactNode;
}

export default function CardsContainer({ children }: CardsContainerProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Stack
      direction="column"
      spacing="5"
      w="100%"
      mx="auto"
      p="2"
      h="100%"
      borderTopRadius="xl"
      bg={isDarkMode ? "dark.gray.800" : ""}
    >
      {children}
    </Stack>
  );
}
