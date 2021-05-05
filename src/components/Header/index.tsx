import { Box, Flex, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { GiPiggyBank } from "react-icons/gi";
import OpenModalButton from "../ActionButtons/OpenModalButton";
import React from "react";

export default function Header() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Box
      h={{ sm: "8vh", md: "10vh" }}
      w="100%"
      borderBottom="1px solid"
      borderColor={isDarkMode ? "dark.purple" : ""}
    >
      <Flex
        h="100%"
        maxW="1024px"
        mx="auto"
        align="center"
        py="2"
        px="5"
        justifyContent="space-between"
      >
        <Box>
          <Icon
            as={GiPiggyBank}
            fontSize="40"
            color={isDarkMode ? "dark.purple" : ""}
          />
        </Box>
        <OpenModalButton mode="creating" />
        <IconButton
          aria-label="Mudar modo de cor"
          icon={<Icon as={isDarkMode ? SunIcon : MoonIcon} />}
          bg="inherit"
        />
      </Flex>
    </Box>
  );
}
