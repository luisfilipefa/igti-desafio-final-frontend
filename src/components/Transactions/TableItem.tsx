import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Th, Tr } from "@chakra-ui/table";

import DeleteButton from "../ActionButtons/DeleteButton";
import { LocalTransaction } from "../../types";
import OpenModalButton from "../ActionButtons/OpenModalButton";
import React from "react";
import { Spinner } from "@chakra-ui/spinner";
import { useColorMode } from "@chakra-ui/color-mode";
import { useTransactions } from "../../contexts/TransactionsContext";

interface TableItemProps {
  transaction: LocalTransaction;
}

export default function TableItem({ transaction }: TableItemProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { isLoading } = useTransactions();

  return (
    <Tr>
      <Th>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <Text>{transaction.dateAsString}</Text>
        )}
      </Th>
      <Th>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <Stack direction="column" spacing="1">
            <Text>{transaction.category}</Text>
            <Text fontSize="xs" color={isDarkMode ? "dark.gray.800" : ""}>
              {transaction.description}
            </Text>
          </Stack>
        )}
      </Th>
      <Th>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <Text
            fontSize="sm"
            color={transaction.type === "+" ? "dark.green" : "dark.red"}
          >
            {transaction.valueAsString}
          </Text>
        )}
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
