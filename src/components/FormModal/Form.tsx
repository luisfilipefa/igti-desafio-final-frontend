import { Box, Button, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { createTransaction, editTransaction } from "../../services/api";

import { ApiTransaction } from "../../types";
import { Input } from "./Input";
import ModalFooter from "./ModalFooter";
import { NumberInput } from "./NumberInput";
import { Select } from "./Select";
import { formatDate } from "../../utils/formatDate";
import { schema } from "./yupConfig";
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
  const {
    handleEditTransaction,
    handleCreateTransaction,
    updateTransactions,
  } = useTransactions();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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
      day: Number(formatDate(values.date, "d")),
      yearMonth: formatDate(values.date, "yyyy-MM"),
      yearMonthDay: formatDate(values.date, "yyyy-MM-dd"),
      type: values.type,
    };

    if (mode === "editing") {
      await handleEditTransaction(transaction.id, data);
    } else {
      await handleCreateTransaction(data);
    }

    updateTransactions();
    disclosure.onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing="5">
        <Input
          name="description"
          error={errors.description}
          placeholder="Descrição"
          {...register("description")}
        />
        <Input
          name="category"
          error={errors.category}
          placeholder="Categoria"
          {...register("category")}
        />
        <Stack direction="row" spacing="1">
          <Select
            name="type"
            error={errors.type}
            placeholder="Tipo"
            {...register("type")}
          >
            <option value="-" style={{ backgroundColor: "#282a36" }}>
              Despesa
            </option>
            <option value="+" style={{ backgroundColor: "#282a36" }}>
              Receita
            </option>
          </Select>
          <Input
            name="date"
            error={errors.date}
            type="date"
            {...register("date")}
          />
        </Stack>
        <NumberInput
          name="value"
          error={errors.value}
          placeholder="15.99"
          {...register("value")}
        />
      </Stack>
      <ModalFooter />
    </Box>
  );
}
