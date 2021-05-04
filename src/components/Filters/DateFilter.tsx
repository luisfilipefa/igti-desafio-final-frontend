import React, { Dispatch, SetStateAction, useEffect } from "react";

import { Select } from "@chakra-ui/react";
import { useTransactions } from "../../contexts/TransactionsContext";

export default function DateFilter() {
  const { filter, setFilter, dates, handleFilter } = useTransactions();

  useEffect(() => {
    (async () => {
      await handleFilter();
    })();
  }, [filter]);

  return (
    <Select
      placeholder="Filtro"
      variant="filled"
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
    >
      {dates.map((date) => (
        <option key={date} value={date} style={{ backgroundColor: "#282a36" }}>
          {date}
        </option>
      ))}
    </Select>
  );
}
