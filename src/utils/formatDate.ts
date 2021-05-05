import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date | string, pattern: string) => {
  const formattedDate = format(new Date(date), pattern, { locale: ptBR });

  return formattedDate;
};
