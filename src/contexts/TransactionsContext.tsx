import { ApiTransaction, LocalTransaction, Summary } from "../types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "../services/api";

import { formatDate } from "../utils/formatDate";

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
  updateTransactions: () => void;
  handleSearch: () => void;
  handleFilter: () => void;
  clearSearch: () => void;
  clearFilter: () => void;
  handleCreateTransaction: (transaction: ApiTransaction) => void;
  handleEditTransaction: (id: string, transaction: ApiTransaction) => void;
  handleDeleteTransaction: (id: string) => void;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<LocalTransaction[]>([]);
  const [summary, setSummary] = useState<Summary>({} as Summary);
  const [dates, setDates] = useState<string[]>([]);
  const defaultFilter = formatDate(new Date(), "yyyy-MM");
  const [filter, setFilter] = useState(defaultFilter);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const updateTransactions = async () => {
    setIsLoading(true);
    const { transactions, summary } = await getTransactions(filter);
    setTransactions(transactions);
    setSummary(summary);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (search !== "") {
      const filteredTransactions = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(search.toLowerCase())
      );
      setTransactions(filteredTransactions);
    }
  };

  const handleFilter = async () => {
    if (filter !== "") {
      await updateTransactions();
    }
  };

  const clearSearch = async () => {
    setSearch("");
    await updateTransactions();
  };

  const clearFilter = async () => {
    setFilter(defaultFilter);
    await updateTransactions();
  };

  const handleCreateTransaction = async (transaction: ApiTransaction) => {
    const response = await createTransaction(transaction);
    await updateTransactions();
    console.log(response);
  };

  const handleEditTransaction = async (
    id: string,
    transaction: ApiTransaction
  ) => {
    const response = await editTransaction(id, transaction);
    await updateTransactions();
    console.log(response);
  };

  const handleDeleteTransaction = async (id: string) => {
    const response = await deleteTransaction(id);
    await updateTransactions();
    console.log(response);
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
        updateTransactions,
        handleSearch,
        handleFilter,
        clearSearch,
        clearFilter,
        handleCreateTransaction,
        handleEditTransaction,
        handleDeleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionsContext);
