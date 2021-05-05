import { FaArrowDown, FaArrowUp, FaBalanceScale } from "react-icons/fa";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";

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
      templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      templateRows={{ sm: "repeat(2, 1fr)", md: "1fr" }}
      gap={{ md: 5 }}
      bg={isDarkMode ? "dark.blue" : ""}
      w="100%"
      borderBottomRadius="xl"
      mx="auto"
      py="2"
      px="5"
    >
      <GridItem colSpan={{ sm: 2, md: 1 }} mx={{ sm: "auto", md: "0" }}>
        <SummaryItem
          title="Balanço"
          value={summary.balance}
          icon={FaBalanceScale}
          color={summary.balance.charAt(0) === "-" ? "dark.red" : "inherit"}
        />
      </GridItem>
      <GridItem mr={{ sm: "auto", md: "0" }}>
        <SummaryItem
          title="Receitas"
          value={summary.totalIncome}
          icon={FaArrowUp}
          color="dark.green"
        />
      </GridItem>
      <GridItem ml={{ sm: "auto", md: "0" }}>
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
