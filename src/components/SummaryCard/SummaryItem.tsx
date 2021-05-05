import { Heading, Icon, Stack, Text, useColorMode } from "@chakra-ui/react";

import { IconType } from "react-icons/lib";
import React from "react";

interface SummaryItemProps {
  title: string;
  value: string;
  icon: IconType;
  color: string;
}

export default function SummaryItem({
  title,
  value,
  icon,
  color,
}: SummaryItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Stack
      direction="row"
      align="center"
      justifyContent="center"
      spacing={{ sm: "3", md: "5" }}
      bg={{ md: "dark.gray.800" }}
      py={{ sm: "0", md: "3" }}
      borderRadius="xl"
    >
      <Icon as={icon} fontSize="20" color={color} />
      <Stack direction="column">
        <Heading fontSize="xl" color={isDarkMode ? "inherit" : "dark.gray.50"}>
          {title}
        </Heading>
        <Text fontSize="sm" color={color}>
          {value}
        </Text>
      </Stack>
    </Stack>
  );
}
