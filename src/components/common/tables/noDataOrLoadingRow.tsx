import { Td, Text, Tr } from "@chakra-ui/react";

export default function NoDataOrLoadingRow({
  loading,
}: Readonly<{ loading: boolean }>) {
  return (
    <Tr>
      <Td colSpan={6} textAlign="center" h={200}>
        {loading ? (
          <Text color="gray.500">Đang tải...</Text>
        ) : (
          <Text color="gray.500">Không có dữ liệu.</Text>
        )}
      </Td>
    </Tr>
  );
}
