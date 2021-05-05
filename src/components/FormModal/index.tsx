import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";

import Form from "./Form";
import React from "react";
import { useFormModal } from "../../contexts/FormModalContext";

export default function FormModal() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { disclosure, mode } = useFormModal();
  const { isOpen, onClose } = disclosure;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={isDarkMode ? "dark.gray.900" : "dark.gray.50"}>
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
