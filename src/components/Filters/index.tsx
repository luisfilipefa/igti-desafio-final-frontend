import React, { ReactNode } from "react";

import { SimpleGrid } from "@chakra-ui/react";

interface FilterProps {
  children: ReactNode;
}

export default function Filters({ children }) {
  return (
    <SimpleGrid columns={{ sm: 2 }} spacing={{ sm: 3 }} w="100%" my="2">
      {children}
    </SimpleGrid>
  );
}
