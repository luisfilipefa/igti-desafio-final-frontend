import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
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
import { Select, SelectField } from "@chakra-ui/select";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";

import CardItem from "../components/Transactions/CardItem";
import CardsContainer from "../components/Transactions/CardsContainer";
import { FaBalanceScale } from "react-icons/fa";
import Head from "next/head";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import Summary from "../components/Summary";
import { api } from "../services/api";
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
  transactions: Transaction[];
  dates: string[];
  summary: Summary;
}

export default function Home(props: HomeProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const isMobile = useBreakpointValue({ sm: true, lg: false });
  const [summary, setSummary] = useState<Summary>(props.summary);
  const [filter, setFilter] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(
    props.transactions
  );

  const calculateSummary = () => {
    const calc = transactions.reduce(
      (acc, transaction) => {
        transaction.type === "+"
          ? (acc.totalIncome += transaction.value)
          : (acc.totalOutcome += transaction.value);

        return acc;
      },
      { totalIncome: 0, totalOutcome: 0 }
    );

    const balance = calc.totalIncome - calc.totalOutcome;

    const result = {
      totalIncome: formatCurrency(calc.totalIncome),
      totalOutcome: formatCurrency(calc.totalOutcome),
      balance: formatCurrency(balance),
    };

    setSummary(result);
  };

  useEffect(() => {
    (async () => {
      if (filter !== "") {
        const response = await api.get(`?filter=${filter}`);

        const data: Transaction[] = response.data.transactions.map(
          (transaction) => ({
            id: transaction._id,
            description: transaction.description,
            value: transaction.value,
            valueAsString: formatCurrency(transaction.value),
            category: transaction.category ? transaction.category : "",
            day: transaction.day,
            date: format(parseISO(transaction.yearMonthDay), "dd/MM/yy", {
              locale: ptBR,
            }),
            type: transaction.type,
          })
        );

        setTransactions(data);
        calculateSummary();
      } else {
        setTransactions(props.transactions);
        setSummary(props.summary);
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
        <Select
          placeholder="Filtro"
          variant="filled"
          onChange={(event) => setFilter(event.target.value)}
          w="120px"
          mx="auto"
          my="5"
        >
          {props.dates.map((date) => (
            <option
              key={date}
              value={date}
              style={{ backgroundColor: "#282a36" }}
            >
              {date}
            </option>
          ))}
        </Select>
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

  const transactions_res = await api.get(`?filter=${filter}`);
  const dates_res = await api.get("/dates");

  const transactions: Transaction[] = transactions_res.data.transactions.map(
    (transaction) => ({
      id: transaction._id,
      description: transaction.description,
      value: transaction.value,
      valueAsString: formatCurrency(transaction.value),
      category: transaction.category ? transaction.category : "",
      day: transaction.day,
      date: format(parseISO(transaction.yearMonthDay), "dd/MM/yy", {
        locale: ptBR,
      }),
      type: transaction.type,
    })
  );

  const array = dates_res.data.dates.map((item) => item.yearMonth);
  const set = new Set(array);
  const dates = Array.from(set);

  const calc = transactions.reduce(
    (acc, transaction) => {
      transaction.type === "+"
        ? (acc.totalIncome += transaction.value)
        : (acc.totalOutcome += transaction.value);

      return acc;
    },
    { totalIncome: 0, totalOutcome: 0 }
  );
  const balance = calc.totalIncome - calc.totalOutcome;
  const summary = {
    totalIncome: formatCurrency(calc.totalIncome),
    totalOutcome: formatCurrency(calc.totalOutcome),
    balance: formatCurrency(balance),
  };

  return { props: { transactions, dates, summary } };
};
