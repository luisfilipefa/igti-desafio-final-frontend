import { Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";

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
    <Flex
      direction="row"
      align="center"
      justifyContent="space-around"
      bg={{ md: "dark.gray.800" }}
      p="3"
      borderRadius="full"
    >
      <Icon as={icon} fontSize="20" color={color} mr={{ sm: "3", md: "0" }} />
      <Stack direction="column">
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="sm" color={color}>
          {value}
        </Text>
      </Stack>
    </Flex>
  );
}
