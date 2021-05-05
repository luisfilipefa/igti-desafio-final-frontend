import * as yup from "yup";

import { ApiTransaction, LocalTransaction } from "../../types";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { createTransaction, editTransaction } from "../../services/api";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { useForm } from "react-hook-form";
import { useFormModal } from "../../contexts/FormModalContext";
import { useTransactions } from "../../contexts/TransactionsContext";
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
  const { transactions, updateTransactions } = useTransactions();

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
    const data: ApiTransaction = {
      description: values.description,
      value: values.value,
      category: values.category,
      year: Number(formatDate(values.date, "yyyy")),
      month: Number(formatDate(values.date, "MM")),
      day: Number(formatDate(values.date, "D")),
      yearMonth: formatDate(values.date, "yyyy-MM"),
      yearMonthDay: formatDate(values.date, "yyyy-MM-dd"),
      type: values.type,
    };

    const localData: LocalTransaction = {
      ...data,
      valueAsString: formatCurrency(data.value),
      dateAsString: formatDate(data.yearMonthDay, "dd/MM/yyyy"),
    };

    if (mode === "editing") {
      const response = await editTransaction(transaction.id, data);
      console.log(response);
    } else {
      const response = await createTransaction(data);
      console.log(response);
    }

    updateTransactions();

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
        <SimpleGrid columns={2} columnGap={1}>
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
          <FormControl isInvalid={!!errors.date}>
            <Input id="date" name="date" type="date" {...register("date")} />
            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <FormControl isInvalid={!!errors.value}>
          <NumberInput min={1}>
            <NumberInputField
              id="value"
              name="value"
              placeholder="15.99"
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
