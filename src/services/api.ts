import { ApiTransaction, LocalTransaction, Summary } from "../types";

import axios from "axios";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const API_URL = process.env.API_URL || "http://localhost:3001/api/transaction";

const api = axios.create({ baseURL: API_URL });

export const getTransactions = async (filter: string) => {
  const transactions_res = await api.get(`?filter=${filter}`);

  const transactions: LocalTransaction[] = transactions_res.data.transactions.map(
    (transaction) => ({
      id: transaction._id,
      description: transaction.description,
      value: transaction.value,
      valueAsString: formatCurrency(transaction.value),
      category: transaction.category ? transaction.category : "",
      year: transaction.year,
      month: transaction.month,
      day: transaction.day,
      yearMonth: transaction.yearMonth,
      yearMonthDay: transaction.yearMonthDay,
      dateAsString: formatDate(parseISO(transaction.yearMonthDay), "dd/MM/yy"),
      type: transaction.type,
    })
  );

  return transactions;
};

export const getDates = async () => {
  const dates_res = await api.get("/dates");

  const array: string[] = dates_res.data.dates.map((item) =>
    item.yearMonth ? item.yearMonth : ""
  );
  const set = new Set(array);
  const dates = Array.from(set);

  return dates;
};

export const getSummary = (transactions: LocalTransaction[]) => {
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
  const summary: Summary = {
    totalIncome: formatCurrency(calc.totalIncome),
    totalOutcome: formatCurrency(calc.totalOutcome),
    balance: formatCurrency(balance),
  };

  return summary;
};

export const editTransaction = async (
  id: string,
  transaction: ApiTransaction
) => {
  try {
    const response = await api.patch(`/${id}`, transaction);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createTransaction = async (transaction: ApiTransaction) => {
  try {
    const response = await api.post("/", transaction);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
