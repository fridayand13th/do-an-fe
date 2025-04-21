import { Badge, Text } from "@chakra-ui/react";
import { TColumn } from "@@types/table/TColumn";
import {
  formatDateWithHour,
  getStatusBackgroundColor,
  truncateText,
} from "@utils/common";
import { ITaskInfo } from "@@types/containers/request";
import { TaskStatus } from "src/pages/dashboard";

export const TaskColumns = () => {
  const columns: TColumn<ITaskInfo>[] = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Tên",
      accessor: "name",
      render: (result) => (
        <Text textAlign="center">{truncateText(result.name, 60)}</Text>
      ),
    },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (result) => {
        const colorScheme = getStatusBackgroundColor(
          result.status as TaskStatus,
        );
        const lightBg = `${colorScheme}.50`;
        return (
          <Badge
            variant="outline"
            p={2}
            borderRadius="md"
            bg={lightBg}
            colorScheme={colorScheme}
          >
            {result.status}
          </Badge>
        );
      },
    },
    {
      header: "Thời gian bắt đầu",
      accessor: "startDate",
      render: (result) => (
        <Text textAlign="center">{formatDateWithHour(result.startDate)}</Text>
      ),
    },
    {
      header: "Thời gian kết thúc",
      accessor: "endDate",
      render: (result) => (
        <Text textAlign="center">{formatDateWithHour(result.endDate)}</Text>
      ),
    },
  ];

  return columns;
};
