import { ChakraProvider } from "@chakra-ui/react";
import FormModal from "../components/FormModal";
import { FormModalProvider } from "../contexts/FormModalContext";
import Header from "../components/Header";
import { TransactionsProvider } from "../contexts/TransactionsContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <TransactionsProvider>
        <FormModalProvider>
          <Header />
          <FormModal />
          <Component {...pageProps} />
        </FormModalProvider>
      </TransactionsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
