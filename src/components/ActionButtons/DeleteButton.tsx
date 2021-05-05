import { FiTrash } from "react-icons/fi";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { LocalTransaction } from "../../types";
import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useFormModal } from "../../contexts/FormModalContext";
import { useTransactions } from "../../contexts/TransactionsContext";

interface DeleteButtonProps {
  transaction: LocalTransaction;
}

export default function DeleteButton({ transaction }: DeleteButtonProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { handleDeleteTransaction } = useTransactions();
  const { mode, disclosure } = useFormModal();

  return (
    <IconButton
      aria-label="Deletar transação"
      icon={<Icon as={FiTrash} />}
      bg="dark.red"
      color={isDarkMode ? "dark.gray.50" : "dark.gray.900"}
      size="xs"
      onClick={() => {
        handleDeleteTransaction(transaction.id);
        if (mode === "editing") {
          disclosure.onClose();
        }
      }}
    />
  );
}
