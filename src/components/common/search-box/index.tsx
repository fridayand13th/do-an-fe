import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";

const SearchBox = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <InputGroup mb={6}>
      <Input
        placeholder="관리자번호, 직함, 키워드를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="md"
        // width={{ base: "100%", md: "auto" }} // Adjust width as needed
        borderColor="blue.300"
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        bg="white"
        borderRadius="md"
      />
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={<GrSearch />}
          colorScheme="blue"
          variant="solid"
          borderRadius="md"
          size="md"
          _hover={{ bg: "blue.600", color: "white" }}
          _active={{ bg: "blue.700" }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBox;
