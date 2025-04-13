import { ReactNode } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import NoDataOrLoadingRow from "@components/common/tables/noDataOrLoadingRow";
import { TColumn } from "@@types/table/TColumn";


interface CommonTableProps<T extends object> {
  columns: TColumn<T>[];
  data: T[] | undefined;
  loading: boolean;
  caption?: ReactNode;
}

const CommonTable = <T extends object>({ columns, data, loading, caption }: CommonTableProps<T>) => {
  return (
    <TableContainer
      border="1px solid"
      borderColor="gray.200"
      boxShadow="md"
      borderRadius="md"
      w="full"
      p={4}
    >
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray" size="md">
          {caption && <TableCaption overflowX="auto">{caption}</TableCaption>}
          <Thead>
            <Tr>
              {columns.map((column) => {
                const uniqueKey = crypto.randomUUID();
                return (
                  <Th key={`column-header-${uniqueKey}`} textAlign="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {column.header}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {renderTableBody({ loading, data, columns })}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default CommonTable;

const renderTableBody = <T extends object>({
  loading,
  data,
  columns,
}: {
  loading: boolean;
  data: T[] | undefined;
  columns: TColumn<T>[]
}) => {

  if (loading || !data?.length) {
    return <NoDataOrLoadingRow loading={loading} />;
  }
  return data.map((result) => {
    const rowKey = crypto.randomUUID();
    return (
      <Tr key={rowKey}>
        {columns.map((column) => {
          const cellKey = crypto.randomUUID();
          return (
            <Td key={cellKey} textAlign="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="200px"
            >
              {column.render ? column.render(result) : (result as any)[column.accessor]}
            </Td>
          );
        })}
      </Tr>
    );
  });
};
