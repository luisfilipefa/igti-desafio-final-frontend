export interface LocalTransaction {
  id?: string;
  description: string;
  value: number;
  valueAsString: string;
  category: string;
  year: number;
  month: number;
  day: number;
  yearMonth: string;
  yearMonthDay: string;
  dateAsString: string;
  type: string;
}

export type ApiTransaction = Omit<
  LocalTransaction,
  "valueAsString" | "dateAsString"
>;

export interface Summary {
  totalOutcome: string;
  totalIncome: string;
  balance: string;
}
