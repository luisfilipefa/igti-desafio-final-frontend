import { AiOutlineEdit } from "react-icons/ai";
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
      icon={<Icon as={AiOutlineEdit} />}
      colorScheme="gray"
      size={mode === "editing" ? "xs" : "md"}
      onClick={() => {
        mode === "editing" ? editingMode(transaction) : creatingMode();
      }}
    />
  );
}
