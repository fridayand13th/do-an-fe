import { FiEye } from "react-icons/fi";
import { Badge, HStack, IconButton, Text } from "@chakra-ui/react";
import { INotice } from "@@types/containers/notice";
import { TColumn } from "@@types/table/TColumn";
import { formatDateWithHour, getColorSchemeFromType, truncateText } from "@utils/common";
import { renderTruncateTextWithPopover } from "@components/common/popover/text";

export const NoticeColumns = (
    { handleOpenInfoPopup }:
        { handleOpenInfoPopup?: (data: INotice) => void }
) => {
    const commonColumns: TColumn<INotice>[] = [
        {
            header: "번호",
            accessor: "id",
        },
        {
            header: "제목",
            accessor: "title",
            render: (result) =>
                renderTruncateTextWithPopover({
                    result: result.title,
                    children: <Text cursor="pointer">{truncateText(result.title, 50)}</Text>
                })
        },
        {
            header: "일자",
            accessor: "createdAt",
            render: (result) => (
                <Text>{formatDateWithHour(result.createdAt)}</Text>
            ),
        },
    ];

    const additionalColumns: TColumn<INotice>[] = [
        {
            header: "유형",
            accessor: "type",
            render: (result) => {
                const colorScheme = getColorSchemeFromType(result.type);
                const lightBg = `${colorScheme}.50`;

                return (
                    <Badge
                        variant="outline"
                        p={2}
                        borderRadius="md"
                        bg={lightBg}
                        colorScheme={colorScheme}
                    >
                        {result.type}
                    </Badge>
                )
            },
        },
        {
            header: "관리",
            accessor: "actions",
            render: (result) => (
                <HStack justifyContent="center">
                    <IconButton
                        aria-label="View Notice"
                        icon={<FiEye />}
                        onClick={() => handleOpenInfoPopup?.(result)}
                        colorScheme="blue"
                    />
                </HStack>
            ),
        },
    ];

    return handleOpenInfoPopup ? [...commonColumns, ...additionalColumns] : commonColumns;
};
