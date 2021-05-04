import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/hooks";

import { LocalTransaction } from "../types";

interface FormModalProviderProps {
  children: ReactNode;
}

interface FormModalContextData {
  disclosure: UseDisclosureReturn;
  mode: "editing" | "creating";
  setMode: Dispatch<SetStateAction<"editing" | "creating">>;
  transaction: LocalTransaction;
  setTransaction: Dispatch<SetStateAction<LocalTransaction>>;
  editingMode: (transaction: LocalTransaction) => void;
  creatingMode: () => void;
}

const FormModalContext = createContext({} as FormModalContextData);

export function FormModalProvider({ children }: FormModalProviderProps) {
  const disclosure = useDisclosure();
  const [mode, setMode] = useState<"editing" | "creating">();
  const [transaction, setTransaction] = useState<LocalTransaction>();

  const editingMode = (transaction: LocalTransaction) => {
    disclosure.onOpen();
    setMode("editing");
    setTransaction(transaction);
  };

  const creatingMode = () => {
    disclosure.onOpen();
    setMode("creating");
  };

  return (
    <FormModalContext.Provider
      value={{
        disclosure,
        mode,
        setMode,
        transaction,
        setTransaction,
        editingMode,
        creatingMode,
      }}
    >
      {children}
    </FormModalContext.Provider>
  );
}

export const useFormModal = () => useContext(FormModalContext);
