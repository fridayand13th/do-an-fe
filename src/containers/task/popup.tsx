import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  deleteTask,
  getTaskDetail,
  updateTaskDetail,
  useCreateTask,
} from "./query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@validation/task";
import { getErrorMessage } from "@utils/common";
import { useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

function TaskPopup({
  props: { taskId, onClose },
}: Readonly<{
  props: {
    taskId?: number;
    onClose: () => void;
  };
}>) {
  const toast = useToast();
  const { data: taskDetailRes } = getTaskDetail(taskId ? String(taskId) : "");
  const { mutate: useDeleteTask, isLoading } = deleteTask();
  const { mutateAsync: createTaskMutation } = useCreateTask();
  const { mutateAsync: editTask, isLoading: isLoadingEdit } =
    updateTaskDetail();

  const taskData = taskDetailRes?.data?.data;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      name: "",
      status: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (taskData) {
      reset({
        name: taskData.name,
        status: taskData.status,
        startDate: taskData.startDate,
        endDate: taskData.endDate,
      });
    }
  }, [taskData, reset]);

  const onSubmit = async (values: any) => {
    try {
      if (taskId) {
        await editTask({
          taskId,
          data: {
            name: values.name,
            startDate: values.startDate,
            endDate: values.endDate,
            status: values.status,
          },
        });
        toast({
          title: "Cập nhật thành công.",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: getErrorMessage(error),
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onCreate = async (values: any) => {
    try {
      await createTaskMutation(values);
      toast({
        title: "Tạo thành công.",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: getErrorMessage(error),
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (taskId) {
        useDeleteTask(String(taskId));
        toast({
          title: "Xóa thành công.",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: getErrorMessage(error),
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderForm = (onSubmitHandler: (values: any) => void) => (
    <Flex align="center" justify="center">
      <Stack
        spacing={8}
        w="full"
        maxW="5xl"
        bg={useColorModeValue("white", "gray.700")}
        rounded="xl"
        boxShadow="lg"
        p={8}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack spacing={4}>
            <HStack spacing={4} alignItems="start">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Tên công việc</FormLabel>
                <Input placeholder="Nhập tên công việc" {...register("name")} />
                <Box minH="30px">
                  <FormErrorMessage className="mt-0">
                    {errors.name?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>

              <FormControl isInvalid={!!errors.status}>
                <FormLabel>Trạng thái</FormLabel>
                <Select {...register("status")}>
                  <option value="Chưa xử lý">Chưa xử lý</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã xử lý">Đã xử lý</option>
                  <option value="Hủy">Hủy</option>
                </Select>
                <Box minH="30px">
                  <FormErrorMessage className="mt-0">
                    {errors.status?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl isInvalid={!!errors.startDate}>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm"
                      style={{ width: "100%" }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(val) =>
                        field.onChange(
                          val ? dayjs(val).format("YYYY-MM-DDTHH:mm:ss") : "",
                        )
                      }
                    />
                  )}
                />
                <Box minH="30px">
                  <FormErrorMessage className="mt-0">
                    {errors.startDate?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>

              <FormControl isInvalid={!!errors.endDate}>
                <FormLabel>Ngày kết thúc</FormLabel>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm"
                      style={{ width: "100%" }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(val) =>
                        field.onChange(
                          val ? dayjs(val).format("YYYY-MM-DDTHH:mm:ss") : "",
                        )
                      }
                    />
                  )}
                />
                <Box minH="30px">
                  <FormErrorMessage className="mt-0">
                    {errors.endDate?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </HStack>
          </Stack>

          <Stack spacing={6} direction="row" pt={6}>
            <Button w="full" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button
              colorScheme="blue"
              w="full"
              type="submit"
              isLoading={isLoadingEdit}
              isDisabled={!isDirty}
            >
              Lưu
            </Button>
            {taskId && (
              <Button
                colorScheme="red"
                w="full"
                type="button"
                isLoading={isLoadingEdit}
                isDisabled={isDirty}
                onClick={handleDelete}
              >
                Xóa
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Flex>
  );

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="600px" maxW="1200px" py={2} className="mt-[140px]">
        <ModalHeader className="pb-0">
          <HStack w="100%">
            <Text fontSize="lg" fontWeight="bold">
              Thông tin chi tiết
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {taskId ? renderForm(onSubmit) : renderForm(onCreate)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TaskPopup;
