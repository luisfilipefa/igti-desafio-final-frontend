import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Flex, Icon, Stack, Text, useColorMode } from "@chakra-ui/react";

import React from "react";

interface Transaction {
  id: string;
  description: string;
  value: number;
  valueAsString: string;
  category: string;
  date: string;
  type: string;
}

interface CardItemProps {
  transaction: Transaction;
}

export default function CardItem({ transaction }: CardItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Flex align="center" justifyContent="space-between">
      <Stack direction="row" align="center">
        <Icon
          as={transaction.type === "+" ? AiOutlineArrowUp : AiOutlineArrowDown}
          color={
            isDarkMode
              ? transaction.type === "+"
                ? "dark.green"
                : "dark.red"
              : ""
          }
          fontSize="30"
        />
        <Stack direction="column">
          <Text>{transaction.description}</Text>
          <Text fontSize="xs" color={isDarkMode ? "gray.900" : ""}>
            {transaction.category}
          </Text>
        </Stack>
      </Stack>
      <Text
        fontSize="sm"
        color={transaction.type === "+" ? "dark.green" : "dark.red"}
      >
        {transaction.valueAsString}
      </Text>
    </Flex>
  );
}
