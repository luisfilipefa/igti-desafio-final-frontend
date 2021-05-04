import { Heading, Icon, Stack, Text } from "@chakra-ui/react";

import { IconType } from "react-icons/lib";
import React from "react";

interface SummaryItemProps {
  title: string;
  value: string;
  icon: IconType;
  color: string;
}

export default function SummaryItem({
  title,
  value,
  icon,
  color,
}: SummaryItemProps) {
  return (
    <Stack direction="row" align="center" spacing="5">
      <Icon as={icon} fontSize="20" color={color} />
      <Stack direction="column">
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="sm" color={color}>
          {value}
        </Text>
      </Stack>
    </Stack>
  );
}
