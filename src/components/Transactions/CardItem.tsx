import { Flex, Icon, Stack, Text, useColorMode } from "@chakra-ui/react";

import { AiOutlineCalendar } from "react-icons/ai";
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
      <Stack direction="row" align="center" spacing="3">
        <Stack direction="row" align="center" spacing="1">
          <Icon as={AiOutlineCalendar} />
          <Text>{transaction.date.split("/")[0]}</Text>
        </Stack>
        <Stack direction="column">
          <Text>{transaction.category}</Text>
          <Text fontSize="xs" color={isDarkMode ? "gray.900" : ""}>
            {transaction.description}
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
