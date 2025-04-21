import { useRouter } from "next/router";
import { Select, Flex, Text } from "@chakra-ui/react";
import useLoading from "@hooks/useLoading";

const PageSizeSelector = () => {
  const router = useRouter();
  const { startLoading } = useLoading();
  const { query } = router;
  const perPage = Number(query.perPage) || 10;

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      query: { ...query, page: 1, perPage: parseInt(e.target.value, 10) },
    });
    startLoading();
  };

  const pageOptions = Array.from(
    { length: 4 },
    (_, index) => 10 * Math.pow(2, index),
  );

  return (
    <Flex mb={4} justifyContent="flex-end" alignItems="center" gap={2}>
      <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
        Số mục trên mỗi trang:{" "}
      </Text>
      <Select
        value={perPage}
        onChange={handlePerPageChange}
        width="80px"
        height="32px"
        fontSize="sm"
        bg="white"
        borderColor="gray.300"
        borderRadius="md"
        boxShadow="sm"
        _hover={{
          borderColor: "blue.300",
        }}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px #3182ce",
        }}
        _active={{
          borderColor: "blue.500",
        }}
      >
        {pageOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default PageSizeSelector;
