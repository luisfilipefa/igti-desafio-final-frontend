import { LocalTransaction, Summary } from "../types";
import { getDates, getSummary, getTransactions } from "../services/api";

import { Box } from "@chakra-ui/layout";
import CardItem from "../components/Transactions/CardItem";
import CardsContainer from "../components/Transactions/CardsContainer";
import DateFilter from "../components/Filters/DateFilter";
import Filters from "../components/Filters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Searchbar from "../components/Filters/Searchbar";
import { Spinner } from "@chakra-ui/spinner";
import SummaryCard from "../components/SummaryCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useEffect } from "react";
import { useTransactions } from "../contexts/TransactionsContext";

interface HomeProps {
  transactions: LocalTransaction[];
  summary: Summary;
  dates: string[];
}

export default function Home(props: HomeProps) {
  const isMobile = useBreakpointValue({ sm: true, lg: false });
  const {
    transactions,
    setTransactions,
    summary,
    setSummary,
    setDates,
    isLoading,
    setIsLoading,
  } = useTransactions();

  const setInitialValues = () => {
    setTransactions(props.transactions);
    setSummary(props.summary);
    setDates(props.dates);
    setIsLoading(false);
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  return (
    <>
      <Head>
        <title>Home | LF Money</title>
      </Head>
      <Box w="100%" maxW="1024px" mx="auto" px="2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <SummaryCard summary={summary} />
            <Filters>
              <DateFilter />
              <Searchbar />
            </Filters>
            {isMobile ? (
              <CardsContainer>
                {transactions.map((transaction) => (
                  <CardItem key={transaction.id} transaction={transaction} />
                ))}
              </CardsContainer>
            ) : (
              "TODO: Transactions Table"
            )}
          </>
        )}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const filter = format(new Date(), "yyyy-MM", {
    locale: ptBR,
  });
  const transactions = await getTransactions(filter);
  const summary = getSummary(transactions);
  const dates = await getDates();

  return { props: { transactions, summary, dates } };
};
