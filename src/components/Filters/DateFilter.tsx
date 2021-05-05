import React, { useEffect } from "react";
import { Select, useColorMode } from "@chakra-ui/react";

import { useTransactions } from "../../contexts/TransactionsContext";

export default function DateFilter() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
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
      bg="inherit"
      border="1px solid"
      borderColor={isDarkMode ? "dark.blue" : "dark.orange"}
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
    >
      {dates.map((date) => (
        <option
          key={date}
          value={date}
          style={{ backgroundColor: isDarkMode ? "#282a36" : "#f8f8f2" }}
        >
          {date}
        </option>
      ))}
    </Select>
  );
}
