import { Td, Text, Tr } from "@chakra-ui/react";

export default function NoDataOrLoadingRow({ loading }: Readonly<{ loading: boolean }>) {
    return (
        <Tr>
            <Td colSpan={6} textAlign="center" h={200}>
                {loading ? (
                    <Text color="gray.500">로딩 중...</Text>
                ) : (
                    <Text color="gray.500">데이터가 없습니다.</Text>
                )}
            </Td>
        </Tr>
    )
}
