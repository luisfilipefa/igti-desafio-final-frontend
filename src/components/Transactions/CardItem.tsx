import { AiOutlineCalendar, AiOutlineEdit } from "react-icons/ai";
import {
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { LocalTransaction } from "../../types";
import React from "react";
import { useFormModal } from "../../contexts/FormModalContext";

interface CardItemProps {
  transaction: LocalTransaction;
}

export default function CardItem({ transaction }: CardItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { disclosure, editingMode } = useFormModal();

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
            color={isDarkMode ? "gray.900" : ""}
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
      <IconButton
        aria-label="Editar transação"
        icon={<Icon as={AiOutlineEdit} />}
        size="xs"
        onClick={() => editingMode(transaction)}
      />
    </Flex>
  );
}
