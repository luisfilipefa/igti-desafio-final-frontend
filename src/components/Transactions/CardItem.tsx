import { Flex, Icon, Stack, Text, useColorMode } from "@chakra-ui/react";

import { AiOutlineCalendar } from "react-icons/ai";
import { LocalTransaction } from "../../types";
import OpenModalButton from "../ActionButtons/OpenModalButton";
import React from "react";

interface CardItemProps {
  transaction: LocalTransaction;
}

export default function CardItem({ transaction }: CardItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Flex align="center" justifyContent="space-between">
      <Stack direction="row" align="center" spacing="3">
        <Stack direction="row" align="center" spacing="1">
          <Icon as={AiOutlineCalendar} />
          <Text>{transaction.day}</Text>
        </Stack>
        <Stack direction="column">
          <Text>{transaction.category}</Text>
          <Text
            fontSize="xs"
            color={isDarkMode ? "dark.gray.900" : ""}
            w="150px"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
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
      <OpenModalButton mode="editing" transaction={transaction} />
    </Flex>
  );
}
