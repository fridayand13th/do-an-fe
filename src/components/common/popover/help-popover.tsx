import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

interface HelpPopoverProps {
  content: string;
  placement?: 'top' | 'bottom' | 'right' | 'left';
}

const HelpPopover: React.FC<HelpPopoverProps> = ({ content, placement = 'right' }) => {
  return (
    <Popover trigger="hover" placement={placement}>
      <PopoverTrigger>
        <IconButton
          aria-label="Help"
          icon={<AiOutlineQuestionCircle />}
          size="sm"
          variant="ghost"
        />
      </PopoverTrigger>
      <PopoverContent bg="gray.700" color="white" borderRadius="md" boxShadow="lg">
        <PopoverArrow bg="gray.700" />
        <PopoverBody fontSize="sm">{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HelpPopover;
