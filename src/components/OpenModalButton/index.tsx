import { AiOutlineEdit } from "react-icons/ai";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { LocalTransaction } from "../../types";
import React from "react";
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

  return (
    <IconButton
      aria-label={mode === "editing" ? "Editar transação" : "Criar transação"}
      icon={<Icon as={AiOutlineEdit} />}
      bg={mode === "editing" ? "dark.gray.900" : "dark.green"}
      color={mode === "creating" && "dark.gray.900"}
      size={mode === "editing" ? "xs" : "md"}
      onClick={() => {
        mode === "editing" ? editingMode(transaction) : creatingMode();
      }}
    />
  );
}
