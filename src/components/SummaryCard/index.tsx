import { FaArrowDown, FaArrowUp, FaBalanceScale } from "react-icons/fa";
import { Flex, Grid, GridItem, Spinner, useColorMode } from "@chakra-ui/react";

import React from "react";
import SummaryItem from "./SummaryItem";
import { useTransactions } from "../../contexts/TransactionsContext";

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
  const { isLoading } = useTransactions();

  return (
    <Grid
      templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      templateRows={{ sm: "repeat(2, 1fr)", md: "1fr" }}
      gap={{ sm: 1, md: 5 }}
      alignItems="center"
      bg={isDarkMode ? "dark.blue" : ""}
      w={{ sm: "100%", md: "80%" }}
      h={{ sm: "20vh", md: "10vh" }}
      borderBottomRadius="xl"
      mx="auto"
      px={{ sm: "2", md: "5" }}
    >
      <GridItem colSpan={{ sm: 2, md: 1 }} mx={{ sm: "auto", md: "0" }}>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <SummaryItem
            title="Balanço"
            value={summary.balance}
            icon={FaBalanceScale}
            color={summary.balance.charAt(0) === "-" ? "dark.red" : "inherit"}
          />
        )}
      </GridItem>
      <GridItem mr={{ sm: "auto", md: "0" }}>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <SummaryItem
            title="Receitas"
            value={summary.totalIncome}
            icon={FaArrowUp}
            color="dark.green"
          />
        )}
      </GridItem>
      <GridItem ml={{ sm: "auto", md: "0" }}>
        {isLoading ? (
          <Flex align="center" justifyContent="center">
            <Spinner color="dark.purple" />
          </Flex>
        ) : (
          <SummaryItem
            title="Despesas"
            value={summary.totalOutcome}
            icon={FaArrowDown}
            color="dark.red"
          />
        )}
      </GridItem>
    </Grid>
  );
}
