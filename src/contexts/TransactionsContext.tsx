import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocalTransaction, Summary } from "../types";
import { getDates, getSummary, getTransactions } from "../services/api";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: LocalTransaction[];
  setTransactions: Dispatch<SetStateAction<LocalTransaction[]>>;
  summary: Summary;
  setSummary: Dispatch<SetStateAction<Summary>>;
  dates: string[];
  setDates: Dispatch<SetStateAction<string[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSearch: () => void;
  handleFilter: () => void;
  clearSearch: () => void;
  clearFilter: () => void;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<LocalTransaction[]>([]);
  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [dates, setDates] = useState<string[]>([]);
  const defaultFilter = format(new Date(), "yyyy-MM", { locale: ptBR });
  const [filter, setFilter] = useState(defaultFilter);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    if (search !== "") {
      const filteredTransactions = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(search.toLowerCase())
      );
      const summary_data = getSummary(filteredTransactions);
      setTransactions(filteredTransactions);
      setSummary(summary_data);
    }
  };

  const handleFilter = async () => {
    if (filter !== "") {
      const transactions_data = await getTransactions(filter);
      setTransactions(transactions_data);
      const summary_data = getSummary(transactions_data);
      setSummary(summary_data);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setTransactions(transactions);
    const summary_data = getSummary(transactions);
    setSummary(summary_data);
  };
  const clearFilter = async () => {
    setFilter(defaultFilter);
    const transactions_data = await getTransactions(filter);
    setTransactions(transactions_data);
    const summary_data = getSummary(transactions_data);
    setSummary(summary_data);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        summary,
        setSummary,
        dates,
        setDates,
        filter,
        setFilter,
        search,
        setSearch,
        isLoading,
        setIsLoading,
        handleSearch,
        handleFilter,
        clearSearch,
        clearFilter,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionsContext);
