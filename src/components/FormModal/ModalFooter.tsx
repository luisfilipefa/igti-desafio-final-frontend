import { Button, Stack, useBreakpointValue } from "@chakra-ui/react";

import DeleteButton from "../ActionButtons/DeleteButton";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormModal } from "../../contexts/FormModalContext";

export default function ModalFooter() {
  const {
    formState: { isSubmitting },
  } = useForm();
  const { disclosure, mode, transaction } = useFormModal();
  const isMobile = useBreakpointValue({ sm: true, md: false });

  return (
    <Stack direction="row" spacing="10" mt="8" mb="3" align="center">
      <Button
        type="submit"
        colorScheme="green"
        ml="auto"
        isLoading={isSubmitting}
      >
        {mode === "creating" ? "Criar" : "Salvar"}
      </Button>
      <Button variant="ghost" onClick={disclosure.onClose}>
        Cancelar
      </Button>
      {isMobile && mode === "editing" ? (
        <DeleteButton transaction={transaction} />
      ) : (
        ""
      )}
    </Stack>
  );
}
