import * as yup from "yup";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { ApiTransaction } from "../../types";
import { api } from "../../services/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { useFormModal } from "../../contexts/FormModalContext";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  description: string;
  category: string;
  type: string;
  date: Date;
  value: number;
}

export default function Form() {
  const { disclosure, mode, transaction } = useFormModal();

  const schema = yup.object().shape({
    description: yup.string().required(),
    category: yup.string().required(),
    type: yup.string().required(),
    date: yup.date().required(),
    value: yup.number().positive().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (mode === "editing") {
      setValue("description", transaction.description);
      setValue("category", transaction.category);
      setValue("type", transaction.type);
      setValue("date", transaction.yearMonthDay);
      setValue("value", transaction.value);
    }
  }, []);

  const onSubmit = async (values: FormValues) => {
    console.log("submit");
    const { description, category, type, date, value } = values;

    const data: ApiTransaction = {
      description,
      value,
      category,
      year: Number(format(date, "yyyy", { locale: ptBR })),
      month: Number(format(date, "MM", { locale: ptBR })),
      day: Number(format(date, "d", { locale: ptBR })),
      yearMonth: format(date, "yyyy-MM", { locale: ptBR }),
      yearMonthDay: format(date, "yyyy-MM-dd", { locale: ptBR }),
      type,
    };

    const response = await api.patch(`/${transaction.id}`, data);

    console.log(response);
    disclosure.onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="5">
        <FormControl isInvalid={!!errors.description}>
          <Input
            id="description"
            name="description"
            placeholder="Descrição"
            {...register("description")}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.category}>
          <Input
            id="category"
            name="category"
            placeholder="Categoria"
            {...register("category")}
          />
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>
        <Flex align="center" justifyContent="space-around">
          <FormControl isInvalid={!!errors.type}>
            <Select
              id="type"
              name="type"
              placeholder="Tipo"
              {...register("type")}
              isReadOnly={mode === "editing" && true}
            >
              <option value="-" style={{ backgroundColor: "#282a36" }}>
                Despesa
              </option>
              <option value="+" style={{ backgroundColor: "#282a36" }}>
                Receita
              </option>
            </Select>
            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Stack direction="row" align="center" spacing="2">
          <FormControl isInvalid={!!errors.date}>
            <Input id="date" name="date" type="date" {...register("date")} />
            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.value}>
            <NumberInput min={1}>
              <NumberInputField
                id="value"
                name="value"
                {...register("value")}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </Stack>
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
    </Box>
  );
}
