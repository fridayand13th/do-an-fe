import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextPageContext } from "next";

interface ErrorPageProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorPageProps) {
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : "An error occurred on client";

  return (
    <VStack
      minH="80vh"
      justifyContent="center"
      alignItems="center"
      p={4}
      spacing={6}
    >
      <Box textAlign="center">
        <Heading as="h1" size="2xl" color="red.500" mb={4}>
          {statusCode || "Error"}
        </Heading>
        <Text fontSize="xl" color="gray.700" mb={6}>
          {errorMessage}
        </Text>
        <NextLink href="/" passHref>
          <Button colorScheme="teal" size="lg">
            Go Back Home
          </Button>
        </NextLink>
      </Box>
    </VStack>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
