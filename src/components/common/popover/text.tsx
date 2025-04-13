import { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Text } from "@chakra-ui/react";

interface TruncateTextWithPopoverProps {
    result?: string;
    children: ReactNode;
}

export const renderTruncateTextWithPopover = ({ result, children }: TruncateTextWithPopoverProps) => (
    <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
            {children}
        </PopoverTrigger>
        <PopoverContent
            bg="gray.500"
            w="fit-content"
            _focus={{ boxShadow: 'none' }}
        >
            <PopoverArrow bg="gray.500" />
            <PopoverBody>
                <Text color="white" whiteSpace="nowrap">{result}</Text>
            </PopoverBody>
        </PopoverContent>
    </Popover>
);
