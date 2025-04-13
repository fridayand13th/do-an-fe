"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  Text,
  Spinner,
  useColorModeValue,
  Icon,
  Flex,
  HStack,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { MdAdd, MdArrowBack, MdArrowForward } from "react-icons/md";

import useMobile from "@hooks/useMobile";
import { getListTask } from "@containers/task/query";
import { ITaskInfo } from "@@types/containers/request";
import usePopup from "@hooks/usePopup";
import TaskPopup from "@containers/task/popup";

export enum TaskStatus {
  OPEN = "Chưa xử lý",
  IN_PROGRESS = "Đang xử lý",
  DONE = "Đã xử lý",
  CANCEL = "Hủy",
}

const getStatusBackgroundColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.OPEN:
      return "red.100";
    case TaskStatus.IN_PROGRESS:
      return "yellow.100";
    case TaskStatus.DONE:
      return "green.100";
    case TaskStatus.CANCEL:
      return "gray.300";
    default:
      return "white";
  }
};

function ListTasks() {
  const router = useRouter();
  const { query } = router;
  const isMobile = useMobile();
  const { openPopup, closePopup } = usePopup();

  const currentPage = Number(query.page) || 1;
  const take = Number(query.take) || 30;

  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  });

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();

  const { startDate, endDate } = useMemo(() => {
    const start = new Date(Date.UTC(year, month, 1));
    const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }, [year, month]);

  const { data: currentData, refetch } = getListTask({
    startDate,
    endDate,
    page: currentPage,
    take,
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      setLoading(true);
      refetch().finally(() => setLoading(false));
    }, 300),
    [refetch],
  );

  useEffect(() => {
    debouncedRefetch();
    return debouncedRefetch.cancel;
  }, [startDate, endDate, debouncedRefetch]);

  const incrementMonth = () => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setUTCMonth(next.getUTCMonth() + 1);
      return next;
    });
  };

  const decrementMonth = () => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setUTCMonth(next.getUTCMonth() - 1);
      return next;
    });
  };

  const taskMap = useMemo(() => {
    const map = new Map<number, ITaskInfo[]>();
    currentData?.items?.forEach((item) => {
      map.set(item.toDoDay, item.tasks);
    });
    return map;
  }, [currentData]);

  const daysInMonth = useMemo(() => {
    const days: number[] = [];
    const totalDays = new Date(year, month + 1, 0).getUTCDate();
    for (let i = 0; i <= totalDays; i++) {
      days.push(i + 1);
    }
    return days;
  }, [year, month]);

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const today = new Date().getUTCDate();
  const isTodayMonth =
    new Date().getUTCMonth() === month && new Date().getUTCFullYear() === year;

  const handleRowClick = (data: ITaskInfo) => {
    openPopup({
      isOpen: true,
      Component: TaskPopup,
      props: {
        taskId: data.id,
        onClose: () => {
          closePopup();
          setTimeout(() => refetch(), 200);
        },
      },
      type: "confirm",
      popupOptions: {
        size: "md",
        isCentered: true,
      },
    });
  };

  const handleBoxClick = () => {
    openPopup({
      isOpen: true,
      Component: TaskPopup,
      props: {
        taskId: undefined,
        onClose: () => {
          closePopup();
          setTimeout(() => refetch(), 200);
        },
      },
      type: "confirm",
      popupOptions: {
        size: "md",
        isCentered: true,
      },
    });
  };

  return (
    <Box w="full" p={6} bg="white" borderRadius="xl" boxShadow="lg">
      <Flex
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="center"
        mb={6}
        gap={4}
      >
        <Button onClick={decrementMonth} variant="ghost" size="sm">
          <Icon as={MdArrowBack} boxSize={5} />
        </Button>

        <Text fontWeight="bold" fontSize="2xl">
          {year} / {month + 1}
        </Text>

        <Button onClick={incrementMonth} variant="ghost" size="sm">
          <Icon as={MdArrowForward} boxSize={5} />
        </Button>
      </Flex>

      <Grid templateColumns="repeat(7, 1fr)" gap={4} mb={2}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text
            key={day}
            textAlign="center"
            fontWeight="semibold"
            fontSize="md"
            opacity={0.8}
          >
            {day}
          </Text>
        ))}
      </Grid>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Grid templateColumns="repeat(7, 1fr)" gap={4}>
          {daysInMonth.map((day) => (
            <GridItem
              key={day}
              p={2}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              minH="140px"
              bg={bgColor}
              boxShadow={
                isTodayMonth && day === today ? "0 0 0 2px #3182ce" : "sm"
              }
              transition="all 0.2s ease-in-out"
              _hover={{ boxShadow: "md" }}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold">{day}</Text>
                <Tooltip label="" hasArrow>
                  <Icon
                    title="Add Task"
                    as={MdAdd}
                    boxSize={5}
                    color="blue.500"
                    cursor="pointer"
                    onClick={handleBoxClick}
                  />
                </Tooltip>
              </Flex>

              <Stack spacing={1}>
                {taskMap.get(day)?.map((task) => (
                  <Box
                    key={task.id}
                    p={2}
                    bg={getStatusBackgroundColor(task.status as TaskStatus)}
                    borderRadius="md"
                    fontSize="sm"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    title={task.name}
                    cursor="pointer"
                    _hover={{ bg: "blue.100" }}
                    onClick={() => handleRowClick(task)}
                  >
                    {task.name}
                  </Box>
                ))}
              </Stack>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ListTasks;
