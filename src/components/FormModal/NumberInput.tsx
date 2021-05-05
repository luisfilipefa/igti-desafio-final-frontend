import {
  NumberInput as ChakraNumberInput,
  NumberInputFieldProps as ChakraNumberInputProps,
  FormControl,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
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
  return (
    <FormControl isInvalid={!!error}>
      <ChakraNumberInput>
        <NumberInputField id={name} name={name} ref={ref} {...rest} />
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
