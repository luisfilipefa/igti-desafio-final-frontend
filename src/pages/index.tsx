import { Box, SimpleGrid } from "@chakra-ui/layout";
import { getDates, getSummary, getTransactions } from "../services/api";
import { useEffect, useState } from "react";

import CardItem from "../components/Transactions/CardItem";
import CardsContainer from "../components/Transactions/CardsContainer";
import DateFilter from "../components/Filters/DateFilter";
import Filters from "../components/Filters";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Searchbar from "../components/Filters/Searchbar";
import Summary from "../components/Summary";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useColorMode } from "@chakra-ui/color-mode";

interface Summary {
  totalOutcome: string;
  totalIncome: string;
  balance: string;
}

interface Transaction {
  id: string;
  description: string;
  value: number;
  valueAsString: string;
  category: string;
  day: number;
  date: string;
  type: string;
}

interface HomeProps {
  filter: string;
  transactions: Transaction[];
  dates: string[];
  summary: Summary;
}

export default function Home(props: HomeProps) {
  const isMobile = useBreakpointValue({ sm: true, lg: false });
  const [summary, setSummary] = useState<Summary>(props.summary);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(props.filter);
  const [transactions, setTransactions] = useState<Transaction[]>(
    props.transactions
  );

  useEffect(() => {
    (async () => {
      if (search !== "") {
        const filteredTransactions = transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(search.toLowerCase())
        );
        setTransactions(filteredTransactions);
        const summary_data = await getSummary(filteredTransactions);
        setSummary(summary_data);
      }

      if (search === "") {
        setTransactions(props.transactions);
        const summary_data = await getSummary(props.transactions);
        setSummary(summary_data);
      }
    })();
  }, [search]);

  useEffect(() => {
    (async () => {
      if (filter !== "" && filter !== props.filter) {
        const transactions_data = await getTransactions(filter);
        setTransactions(transactions_data);
        const summary_data = await getSummary(transactions_data);
        setSummary(summary_data);
      } else {
        setTransactions(props.transactions);
        const summary_data = await getSummary(props.transactions);
        setSummary(summary_data);
      }
    })();
  }, [filter]);

  return (
    <>
      <Head>
        <title>Home | LF Money</title>
      </Head>
      <Box w="100%" maxW="1024px" mx="auto" px="2">
        <Summary summary={summary} />
        <Filters>
          <DateFilter
            dates={props.dates}
            filter={filter}
            setFilter={setFilter}
          />
          <Searchbar search={search} setSearch={setSearch} />
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
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const filter = format(new Date(), "yyyy-MM", {
    locale: ptBR,
  });
  const transactions = await getTransactions(filter);
  const dates = await getDates();
  const summary = getSummary(transactions);

  return { props: { filter, transactions, dates, summary } };
};
