import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";
import { FieldErrors, FieldValues } from "react-hook-form";
import React, { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";

interface SelectProps extends ChakraSelectProps {
  name: string;
  error: FieldErrors<FieldValues>;
  children: ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, error, children, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <FormControl isInvalid={!!error}>
      <ChakraSelect
        id={name}
        name={name}
        ref={ref}
        bg={isDarkMode ? "dark.gray.800" : "gray.200"}
        {...rest}
      >
        {children}
      </ChakraSelect>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
