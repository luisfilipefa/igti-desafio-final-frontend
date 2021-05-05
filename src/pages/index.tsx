import { Box, Flex, Text } from "@chakra-ui/layout";
import { LocalTransaction, Summary } from "../types";
import { getDates, getTransactions } from "../services/api";

import CardItem from "../components/Transactions/CardItem";
import CardsContainer from "../components/Transactions/CardsContainer";
import DateFilter from "../components/Filters/DateFilter";
import Filters from "../components/Filters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Searchbar from "../components/Filters/Searchbar";
import SummaryCard from "../components/SummaryCard";
import TableItem from "../components/Transactions/TableItem";
import TransactionsTable from "../components/Transactions/TransactionsTable";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useEffect } from "react";
import { useTransactions } from "../contexts/TransactionsContext";

interface HomeProps {
  transactions?: LocalTransaction[];
  summary?: Summary;
  dates?: string[];
  notFound: boolean;
}

export default function Home(props: HomeProps) {
  const isMobile = useBreakpointValue({ sm: true, md: false });
  const {
    transactions,
    setTransactions,
    summary,
    setSummary,
    setDates,
    setIsLoading,
  } = useTransactions();

  const setInitialValues = () => {
    setTransactions(props.transactions);
    setSummary(props.summary);
    setDates(props.dates);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.notFound) {
      setInitialValues();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home | LF Money</title>
      </Head>
      <Box maxW="1024px" mx="auto" px="2">
        {props.notFound ? (
          <Flex align="center" justifyContent="center" h="calc(100vh - 8vh)">
            <Text>Opa, não consegui recuperar os dados!</Text>
          </Flex>
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
              <TransactionsTable>
                {transactions.map((transaction) => (
                  <TableItem key={transaction.id} transaction={transaction} />
                ))}
              </TransactionsTable>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const filter = formatDate(new Date(), "yyyy-MM");
    const { transactions, summary } = await getTransactions(filter);
    const dates = await getDates();

    return { props: { transactions, summary, dates, notFound: false } };
  } catch (err) {
    console.log(err.message);
    return { props: { notFound: true } };
  }
};
