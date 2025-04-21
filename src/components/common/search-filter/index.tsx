import {
  Box,
  Button,
  FormLabel,
  HStack,
  Select,
  VStack,
  Input,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const SearchTaskStatus = [
  { label: "Tất cả", value: "Tất cả" },
  { label: "Chưa xử lý", value: "Chưa xử lý" },
  { label: "Đang xử lý", value: "Đang xử lý" },
  { label: "Đã xử lý", value: "Đã xử lý" },
  { label: "Hủy", value: "Hủy" },
];

interface SearchFilters {
  name: string;
  status: string | "Tất cả";
  startDate: string;
  endDate: string;
}

export function TaskSearchForm({
  onSearch,
}: {
  onSearch: (filters: SearchFilters) => void;
}) {
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    status: "Tất cả",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field: keyof SearchFilters) => (e: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e?.target?.value ?? e, // for inputs/selects
    }));
  };

  const handleDateChange = (field: "startDate" | "endDate") => (val: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: val ? dayjs(val).format("YYYY-MM-DDTHH:mm:ss") : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mb={5}
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
    >
      <VStack align="start" spacing={6} w="full">
        {/* Row 1: Task Name & Status */}
        <HStack spacing={6} w="full">
          <Box flex={1}>
            <FormLabel>Tên công việc</FormLabel>
            <Input
              placeholder="Tên công việc"
              value={filters.name}
              onChange={handleChange("name")}
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "teal.500" }}
            />
          </Box>
          <Box flex={1}>
            <FormLabel>Trạng thái</FormLabel>
            <Select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "teal.500" }}
            >
              {SearchTaskStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>

        {/* Row 2: Start Date & End Date */}
        <HStack spacing={6} w="full">
          <Box flex={1}>
            <FormLabel>Bắt đầu từ</FormLabel>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              value={filters.startDate ? dayjs(filters.startDate) : null}
              onChange={handleDateChange("startDate")}
            />
          </Box>
          <Box flex={1}>
            <FormLabel>Kết thúc lúc</FormLabel>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              value={filters.endDate ? dayjs(filters.endDate) : null}
              onChange={handleDateChange("endDate")}
            />
          </Box>
        </HStack>

        {/* Row 3: Search Button */}
        <Button
          leftIcon={<AiOutlineSearch />}
          colorScheme="telegram"
          type="submit"
          size="md"
        >
          Tìm kiếm
        </Button>
      </VStack>
    </Box>
  );
}
