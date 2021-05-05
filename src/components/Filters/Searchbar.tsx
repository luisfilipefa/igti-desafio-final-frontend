import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useTransactions } from "../../contexts/TransactionsContext";

export default function Searchbar() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { search, setSearch, handleSearch, clearSearch } = useTransactions();

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <InputGroup borderColor={isDarkMode ? "dark.blue" : "dark.orange"}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={AiOutlineSearch} />}
      />
      <Input
        placeholder="Pesquisar..."
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
