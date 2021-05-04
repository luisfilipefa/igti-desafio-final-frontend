import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

import { extendTheme } from "@chakra-ui/react";

interface ConfigProps {
  initialColorMode: "dark" | "light";
  useSystemColorMode: boolean;
}

const config: ConfigProps = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1400px",
});

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#f8f8f2", "#282a36")(props),
      color: mode("#282a36", "#f8f8f2")(props),
      fontFamily: "Poppins",
    },
    heading: {
      fontWeight: "bold",
    },
  }),
};

const colors = {
  dark: {
    "gray.900": "#282a36",
    "gray.800": "#44475a",
    "gray.50": "#f8f8f2",
    blue: "#6272a4",
    green: "#50fa7b",
    purple: "#bd93f9",
    red: "#ff5555",
  },
};

export const theme = extendTheme({
  config,
  breakpoints,
  styles,
  colors,
});
