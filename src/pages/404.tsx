import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <VStack
      minH="70vh"
      justifyContent="center"
      alignItems="center"
      p={4}
      spacing={6}
    >
      <Box textAlign="center">
        <Heading as="h1" size="2xl" color="red.500" mb={4}>
          404
        </Heading>
        <Text fontSize="xl" color="gray.700" mb={6}>
          Oops! Trang không tồn tại.
        </Text>
        <NextLink href="/" passHref>
          <Button colorScheme="blue" size="lg" color="white">
            Về trang chủ
          </Button>
        </NextLink>
      </Box>
    </VStack>
  );
}
