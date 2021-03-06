import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";

import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { LocalTransaction } from "../../types";
import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useFormModal } from "../../contexts/FormModalContext";

interface OpenModalButtonProps {
  mode: "editing" | "creating";
  transaction?: LocalTransaction;
}

export default function OpenModalButton({
  mode,
  transaction,
}: OpenModalButtonProps) {
  const { editingMode, creatingMode } = useFormModal();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <IconButton
      aria-label={mode === "editing" ? "Editar transação" : "Criar transação"}
      icon={<Icon as={mode === "editing" ? AiOutlineEdit : AiOutlineFileAdd} />}
      bg={isDarkMode ? "dark.blue" : "dark.orange"}
      color={isDarkMode ? "dark.gray.50" : "dark.gray.900"}
      size={mode === "editing" ? "xs" : "md"}
      onClick={() => {
        mode === "editing" ? editingMode(transaction) : creatingMode();
      }}
    />
  );
}
