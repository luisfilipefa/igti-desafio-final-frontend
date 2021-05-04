import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaArrowDown, FaArrowUp, FaBalanceScale } from "react-icons/fa";
import {
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import React from "react";
import SummaryItem from "./SummaryItem";

interface Summary {
  totalOutcome: string;
  totalIncome: string;
  balance: string;
}

interface SummaryProps {
  summary: Summary;
}

export default function SummaryCard({ summary }: SummaryProps) {
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
        <SummaryItem
          title="Balanço"
          value={summary.balance}
          icon={FaBalanceScale}
          color={summary.balance.charAt(0) === "-" ? "dark.red" : "inherit"}
        />
      </GridItem>
      <GridItem mr="auto">
        <SummaryItem
          title="Receitas"
          value={summary.totalIncome}
          icon={FaArrowUp}
          color="dark.green"
        />
      </GridItem>
      <GridItem ml="auto">
        <SummaryItem
          title="Despesas"
          value={summary.totalOutcome}
          icon={FaArrowDown}
          color="dark.red"
        />
      </GridItem>
    </Grid>
  );
}
