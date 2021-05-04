import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { FaBalanceScale } from "react-icons/fa";
import React from "react";

interface Summary {
  totalOutcome: string;
  totalIncome: string;
  balance: string;
}

interface SummaryProps {
  summary: Summary;
}

export default function Summary({ summary }: SummaryProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <Grid
      templateColumns={{ sm: "repeat(2, 1fr)" }}
      templateRows={{ sm: "repeat(2, 1fr)" }}
      bg={isDarkMode ? "dark.blue" : ""}
      h="25vh"
      w="100%"
      borderBottomRadius="xl"
      mx="auto"
      py="2"
      px="5"
    >
      <GridItem colSpan={{ sm: 2 }} mx="auto">
        <Stack direction="row" align="center" spacing="5">
          <Icon as={FaBalanceScale} fontSize="20" />
          <Stack direction="column">
            <Heading fontSize="xl">Balanço</Heading>
            <Text
              fontSize="sm"
              color={summary.balance.charAt(0) === "-" ? "dark.red" : "inherit"}
            >
              {summary.balance}
            </Text>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem mr="auto">
        <Stack direction="row" align="center" spacing="5">
          <Icon as={AiOutlineArrowUp} color="dark.green" fontSize="20" />
          <Stack direction="column">
            <Heading fontSize="xl">Receitas</Heading>
            <Text fontSize="sm" color="dark.green">
              {summary.totalIncome}
            </Text>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem ml="auto">
        <Stack direction="row" align="center" spacing="5">
          <Icon as={AiOutlineArrowDown} color="dark.red" fontSize="20" />
          <Stack direction="column">
            <Heading fontSize="xl">Receitas</Heading>
            <Text fontSize="sm" color="dark.red">
              {summary.totalOutcome}
            </Text>
          </Stack>
        </Stack>
      </GridItem>
    </Grid>
  );
}
