export const formatCurrency = (value: number) => {
  const string = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return string;
};
