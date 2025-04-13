import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import Paginate from "@components/common/paginate";
import NoDataOrLoadingRow from "@components/common/tables/noDataOrLoadingRow";
import PageSizeSelector from "@components/common/paginate/page-size";
import { TPaginate } from "@@types/forms/common-type";
import { TColumn } from "@@types/table/TColumn";
import useMobile from "@hooks/useMobile";


interface PaginatedTableProps<T extends object> {
    columns: TColumn<T>[];
    data: TPaginate<T> | undefined;
    loading: boolean;
    onRowClick?: (row: T)=> void;
}

const PaginatedTable = <T extends object>({
    columns,
    data,
    loading,
    onRowClick
}: PaginatedTableProps<T>) => {
    const [totalPages, setTotalPages] = useState<number>(1);
    const isMobile = useMobile();
    useEffect(() => {
        if (data?.totalPage) {
            setTotalPages(data.totalPage);
        } else {
            setTotalPages(1); 
        }
    }, [data]);


    return (
        <Flex gap={3} flexDirection="column">
            <Box overflowX="auto">
                <Table
                    variant="striped"
                    size="sm"
                    borderRadius="md"
                    boxShadow="md"
                >
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
                        {renderTableBody({ loading, data, columns, onRowClick })}
                    </Tbody>
                </Table>
            </Box>
            <Stack
                direction={isMobile ? "column" : "row"}
                w="100%"
                alignItems="center"
                spacing={4} 
            >
                <Box flex="1" />

                <Paginate totalPage={totalPages} />

                <Box flex="1" display="flex" w="full" justifyContent="flex-end">
                    <PageSizeSelector />
                </Box>
            </Stack>
        </Flex>
    );
};

const renderTableBody = <T extends object>({
    loading,
    data,
    columns,
    onRowClick,
}: {
    loading: boolean;
    data: TPaginate<T> | undefined;
    columns: TColumn<T>[];
    onRowClick?: (row: T)=>void
}) => {

    const handleRowClick = (event: React.MouseEvent, row: T) => {
        if (window.getSelection()?.toString()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onRowClick?.(row);
    };

    if (loading || !data?.items?.length) {
        return <NoDataOrLoadingRow loading={loading} />;
    }
    return data.items.map((result) => {
        const rowKey = crypto.randomUUID();
        return (
            <Tr
                key={rowKey}
                onClick={(e) => onRowClick && handleRowClick(e, result)} 
                style={{
                    cursor: onRowClick ? "pointer" : "default", 
                }}
            >
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

export default PaginatedTable;
