import { Icon, useColorMode } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Stack, Text } from "@chakra-ui/layout";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";

import { AiOutlineCalendar } from "react-icons/ai";

interface TransactionsTableProps {
  children: ReactNode;
}

export default function TransactionsTable({
  children,
}: TransactionsTableProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Table colorScheme={isDarkMode ? "gray" : "blackAlpha"} variant="striped">
      <Thead>
        <Tr>
          <Th>
            <Stack direction="row" align="center" spacing="1">
              <Icon as={AiOutlineCalendar} />
              <Text>Data</Text>
            </Stack>
          </Th>
          <Th>
            <Text>Categoria/Descrição</Text>
          </Th>
          <Th>
            <Text>Valor</Text>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
}
