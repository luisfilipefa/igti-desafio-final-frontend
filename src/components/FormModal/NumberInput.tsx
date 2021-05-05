import {
  NumberInput as ChakraNumberInput,
  NumberInputFieldProps as ChakraNumberInputProps,
  FormControl,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  useColorMode,
} from "@chakra-ui/react";
import { FieldErrors, FieldValues } from "react-hook-form";
import React, { ForwardRefRenderFunction, forwardRef } from "react";

interface NumberInputProps extends ChakraNumberInputProps {
  name: string;
  error: FieldErrors<FieldValues>;
}

const NumberInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  NumberInputProps
> = ({ name, error = null, ...rest }, ref) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;

  return (
    <FormControl isInvalid={!!error}>
      <ChakraNumberInput>
        <NumberInputField
          id={name}
          name={name}
          ref={ref}
          bg={isDarkMode ? "dark.gray.800" : "gray.200"}
          {...rest}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>

      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const NumberInput = forwardRef(NumberInputBase);
