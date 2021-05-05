import "react-toastify/dist/ReactToastify.min.css";

import { ChakraProvider } from "@chakra-ui/react";
import FormModal from "../components/FormModal";
import { FormModalProvider } from "../contexts/FormModalContext";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { TransactionsProvider } from "../contexts/TransactionsContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <TransactionsProvider>
        <FormModalProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
          <Header />
          <FormModal />
          <Component {...pageProps} />
        </FormModalProvider>
      </TransactionsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
