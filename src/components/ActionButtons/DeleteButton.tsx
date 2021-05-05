import { FiTrash } from "react-icons/fi";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { LocalTransaction } from "../../types";
import React from "react";
import { useFormModal } from "../../contexts/FormModalContext";
import { useTransactions } from "../../contexts/TransactionsContext";

interface DeleteButtonProps {
  transaction: LocalTransaction;
}

export default function DeleteButton({ transaction }: DeleteButtonProps) {
  const { handleDeleteTransaction } = useTransactions();
  const { mode, disclosure } = useFormModal();

  return (
    <IconButton
      aria-label="Deletar transação"
      icon={<Icon as={FiTrash} />}
      colorScheme="red"
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
