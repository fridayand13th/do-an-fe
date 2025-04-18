import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import data from "@public/meta.json";

export const Cards: React.FC = () => {
  return (
    <SimpleGrid columns={4} spacing={10} px={20} py={10}>
      {(data?.plugins ?? []).map((plugin) => (
        <Box key={plugin.name}>
          <Heading fontSize={16} fontWeight="500" py={5}>
            {plugin.name}
          </Heading>
          <Text fontSize={14}>{plugin.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
