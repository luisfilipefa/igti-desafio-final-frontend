import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface SearchbarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function Searchbar({ search, setSearch }: SearchbarProps) {
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
            onClick={() => setSearch("")}
          />
        }
      />
    </InputGroup>
  );
}
