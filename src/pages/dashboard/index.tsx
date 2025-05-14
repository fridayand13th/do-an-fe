"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  Text,
  Spinner,
  Icon,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { MdAdd, MdArrowBack, MdArrowForward } from "react-icons/md";

import useMobile from "@hooks/useMobile";
import { getListTask } from "@containers/task/query";
import { ITask, ITaskInfo } from "@@types/containers/request";
import usePopup from "@hooks/usePopup";
import TaskPopup from "@containers/task/popup";
import ChatWidget from "@components/chat-box";
import { useRouter } from "next/router";
import { getStatusBackgroundColor } from "@utils/common";

export enum TaskStatus {
  OPEN = "Chưa xử lý",
  IN_PROGRESS = "Đang xử lý",
  DONE = "Đã xử lý",
  CANCEL = "Hủy",
}

function ListTasks() {
  const router = useRouter();
  const { query } = router;
  const isMobile = useMobile();
  const { openPopup, closePopup } = usePopup();
  const currentPage = Number(query.page) || 1;
  const take = Number(query.take) || 30;
  const bgColor = useColorModeValue("gray.50", "gray.700");

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

  const taskMap = useMemo(() => {
    const map = new Map<number, ITaskInfo[]>();
    currentData?.items?.forEach((task: any) => {
      const day = task.toDoDay; // Giả sử toDoDay là số ngày trong tháng (19, 20,...)
      if (!map.has(day)) {
        map.set(day, []);
      }
      map.set(task.toDoDay, task.tasks);
    });
    return map;
  }, [currentData]);

  const daysInMonth = useMemo(() => {
    const days: number[] = [];
    const totalDays = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  }, [year, month]);

  const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();

  const today = new Date().getUTCDate();
  const isTodayMonth =
    new Date().getUTCMonth() === month && new Date().getUTCFullYear() === year;

  const handleRowClick = (task: ITaskInfo) => {
    openPopup({
      isOpen: true,
      Component: TaskPopup,
      props: {
        taskId: task.id,
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

  const handleAddTask = () => {
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

  return (
    <>
      <Box w="full" p={6} bg="white" borderRadius="xl" boxShadow="lg">
        <Flex justify="space-between" align="center" mb={6}>
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
          {[
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
          ].map((day) => (
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
            {/* Empty slots for first week padding */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <Box key={`empty-${i}`} />
            ))}

            {/* Actual days */}
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
                  <Tooltip hasArrow>
                    <Icon
                      title="Add Task"
                      as={MdAdd}
                      boxSize={5}
                      color="blue.500"
                      cursor="pointer"
                      onClick={handleAddTask}
                      ref={null}
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
                      {task.name.length >= 21
                        ? `${task.name.slice(0, 10)}...`
                        : task.name}
                    </Box>
                  ))}
                </Stack>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>

      <ChatWidget onTaskCreated={() => refetch()} />
    </>
  );
}

export default ListTasks;
