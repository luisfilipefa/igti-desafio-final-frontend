import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Form from "./Form";
import React from "react";
import { useFormModal } from "../../contexts/FormModalContext";

export default function FormModal() {
  const { disclosure, mode } = useFormModal();
  const { isOpen, onClose } = disclosure;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="dark.gray.900">
        <ModalHeader>{`${
          mode === "creating" ? "Criar" : "Editar"
        } Transação`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
