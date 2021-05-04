import React, { Dispatch, SetStateAction } from "react";

import { Select } from "@chakra-ui/react";

interface DateFilterProps {
  dates: string[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export default function DateFilter({ dates, filter, setFilter }) {
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
