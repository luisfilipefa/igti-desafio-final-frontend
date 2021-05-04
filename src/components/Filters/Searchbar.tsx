import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { useTransactions } from "../../contexts/TransactionsContext";

export default function Searchbar() {
  const { search, setSearch, handleSearch, clearSearch } = useTransactions();

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={AiOutlineSearch} />}
      />
      <Input
        placeholder="Filtrar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <InputRightElement
        pointerEvents="all"
        children={
          <IconButton
            aria-label="Limpar pesquisa"
            icon={<Icon as={AiOutlineClose} />}
            variant="unstyled"
            onClick={clearSearch}
          />
        }
      />
    </InputGroup>
  );
}
