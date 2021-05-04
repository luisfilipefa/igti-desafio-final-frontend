import { format, parseISO } from "date-fns";

import axios from "axios";
import { formatCurrency } from "../utils/formatCurrency";
import { ptBR } from "date-fns/locale";

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

const API_URL = process.env.API_URL || "http://localhost:3001/api/transaction";

export const api = axios.create({ baseURL: API_URL });

export const getTransactions = async (filter: string) => {
  const transactions_res = await api.get(`?filter=${filter}`);

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

  return transactions;
};

export const getDates = async () => {
  const dates_res = await api.get("/dates");

  const array = dates_res.data.dates.map((item) => item.yearMonth);
  const set = new Set(array);
  const dates = Array.from(set);

  return dates;
};

export const getSummary = (transactions: Transaction[]) => {
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

  return summary;
};
