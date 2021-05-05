import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";
import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        id={name}
        name={name}
        ref={ref}
        bg={isDarkMode ? "dark.gray.800" : "gray.200"}
        {...rest}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
