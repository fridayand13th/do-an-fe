import React from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
} from '@chakra-ui/react';

const SearchFilter = React.forwardRef(
  (props: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <InputGroup size="sm">
        <Input {...props} ref={ref} borderRadius="md"/>
        <InputRightAddon p={0}>
          <button type="submit" className="w-full h-full px-[12px]">
            <FaSearch />
          </button>
        </InputRightAddon>
      </InputGroup>
    );
  },
);
export default React.memo(SearchFilter);

