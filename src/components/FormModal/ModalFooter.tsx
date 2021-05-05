import { Button, Stack } from "@chakra-ui/react";

import React from "react";
import { useForm } from "react-hook-form";
import { useFormModal } from "../../contexts/FormModalContext";

export default function ModalFooter() {
  const {
    formState: { isSubmitting },
  } = useForm();
  const { disclosure, mode } = useFormModal();

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
    </Stack>
  );
}
