import { Stack, Text } from "@chakra-ui/layout";
import { Th, Tr } from "@chakra-ui/table";

import DeleteButton from "../ActionButtons/DeleteButton";
import { LocalTransaction } from "../../types";
import OpenModalButton from "../ActionButtons/OpenModalButton";
import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";

interface TableItemProps {
  transaction: LocalTransaction;
}

export default function TableItem({ transaction }: TableItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Tr>
      <Th>
        <Text>{transaction.dateAsString}</Text>
      </Th>
      <Th>
        <Stack direction="column" spacing="1">
          <Text>{transaction.category}</Text>
          <Text fontSize="xs" color={isDarkMode ? "dark.gray.800" : ""}>
            {transaction.description}
          </Text>
        </Stack>
      </Th>
      <Th>
        <Text
          fontSize="sm"
          color={transaction.type === "+" ? "dark.green" : "dark.red"}
        >
          {transaction.valueAsString}
        </Text>
      </Th>
      <Th>
        <Stack direction="row" spacing="1">
          <OpenModalButton mode="editing" transaction={transaction} />
          <DeleteButton transaction={transaction} />
        </Stack>
      </Th>
    </Tr>
  );
}
