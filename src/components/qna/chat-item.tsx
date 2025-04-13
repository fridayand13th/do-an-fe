import { isToday } from "date-fns";
import { MdMoreVert } from "react-icons/md";
import { Avatar, Box, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text, VStack } from "@chakra-ui/react";
import { formatDateWithHour, formatHour } from "@utils/common";
import { IQnA } from "@@types/containers/qna";

interface ChatItemProps {
    messageData: IQnA;
    id: number;
    handleEdit: (messageId: number, currentMessage: string) => void;
    handleRemove: (messageId: number) => void;
}
export default function ChatItem({
    messageData,
    id,
    handleEdit,
    handleRemove,
}: ChatItemProps) {
    const { content, user, created_at, deleted_at, updated_at } = messageData;
    const isUserMessage = user?.id === id;


    return (
        <Box
            key={messageData.id}
            bg={deleted_at ? "gray.200" : isUserMessage ? "blue.100" : "green.100"}
            borderRadius="md"
            p={4}
            w="fit-content"
            maxW="80%"
            ml={isUserMessage ? "auto" : 0}
            mr={isUserMessage ? 0 : "auto"}
            mb={2}
            boxShadow="sm"
        >
            <HStack spacing={3} align="flex-start">
                <Avatar size="sm" name={user?.name} src={user?.avatar} />
                <VStack align="start" spacing={0}>
                    <HStack spacing={1} wrap="wrap">
                        <Text fontWeight="bold">{user?.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {isToday(new Date(created_at)) ? formatHour(created_at) : formatDateWithHour(created_at)} {updated_at && "(편집됨)"}
                        </Text>
                    </HStack>
                    <Text>{!deleted_at ? content : "이 메시지는 삭제되었습니다."}</Text>
                </VStack>
                {isUserMessage && !deleted_at && (
                    <Menu>
                        <MenuButton as={IconButton} icon={<MdMoreVert />} size="sm" variant="link" />
                        <MenuList minWidth="auto" width="auto">
                            <MenuItem onClick={() => handleEdit(messageData.id, content)}>편집</MenuItem>
                            <MenuItem onClick={() => handleRemove(messageData.id)}>삭제</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </HStack>
        </Box>
    );
}
