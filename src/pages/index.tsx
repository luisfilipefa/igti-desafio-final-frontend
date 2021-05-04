import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { GetServerSideProps, GetStaticProps } from "next";
import { Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Select, SelectField } from "@chakra-ui/select";
import { api, getDates, getSummary, getTransactions } from "../services/api";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";

import CardItem from "../components/Transactions/CardItem";
import CardsContainer from "../components/Transactions/CardsContainer";
import DateFilter from "../components/Filters/DateFilter";
import { FaBalanceScale } from "react-icons/fa";
import Head from "next/head";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import Searchbar from "../components/Filters/Searchbar";
import Summary from "../components/Summary";
import { formatCurrency } from "../utils/formatCurrency";
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
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
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
        <SimpleGrid columns={{ sm: 2 }} spacing={{ sm: 3 }} w="100%" my="2">
          <DateFilter
            dates={props.dates}
            filter={filter}
            setFilter={setFilter}
          />
          <Searchbar search={search} setSearch={setSearch} />
        </SimpleGrid>
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
