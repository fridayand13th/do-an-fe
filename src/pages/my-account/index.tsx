import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPerson } from "react-icons/io";
import { MdEmail, MdOutlineFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { editProfileRequest } from "@containers/account/query";
import { yupResolver } from "@hookform/resolvers/yup";
import useMobile from "@hooks/useMobile";
import { meSelector } from "@stores/me";
import { getErrorMessage } from "@utils/common";
import { meSchema } from "@validation/me";

const hobbies = {
  items: [
    { label: "Sáng", value: "sáng" },
    { label: "Chiều", value: "chiều" },
    { label: "Tối", value: "tối" },
  ],
};

export default function UserProfileEdit() {
  const toast = useToast();
  const { firstName, lastName, email, hobby } = useSelector(meSelector);
  const { mutateAsync: editProfile, isLoading: isLoadingEdit } =
    editProfileRequest();
  const isMobile = useMobile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(meSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      hobby,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      await editProfile(values);
      toast({
        title: "Cập nhật thành công.",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toast({
        title: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    reset();
  };
  useEffect(() => {
    if (firstName && lastName && email) {
      reset({
        firstName,
        lastName,
        email,
      });
    }
  }, [firstName, lastName, email, reset]);

  return (
    <Flex align={"center"} justify={"center"} pt={6}>
      <Stack
        spacing={8}
        w={"full"}
        maxW={"5xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={8}
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          <GridItem
            borderRight={isMobile ? "none" : "1px solid"}
            borderBottom={isMobile ? "1px solid" : "none"}
            borderColor="gray.300"
            p={4}
          >
            <Heading fontSize={"2xl"} mb={4} textAlign="center">
              Thông tin cá nhân
            </Heading>
            <Stack align={"center"} spacing={4}>
              <Avatar
                size="2xl"
                src={undefined}
                bg={"blue.500"}
                color={"white"}
                my={10}
              />
              <Text fontSize="lg" fontWeight="bold">
                {firstName && lastName
                  ? `${firstName} ${lastName}`
                  : "Đang lấy tên..."}
              </Text>
            </Stack>
          </GridItem>

          <GridItem>
            <Heading
              fontSize={"2xl"}
              mb={4}
              px={10}
              textAlign={isMobile ? "center" : "left"}
            >
              Chỉnh sửa thông tin cá nhân
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p={isMobile ? 0 : 10}>
                <HStack spacing={4} alignItems="start">
                  <FormControl id="firstName" isInvalid={!!errors.firstName}>
                    <FormLabel display="flex" alignItems="center">
                      <Icon as={IoMdPerson} mr={2} />
                      Họ
                    </FormLabel>
                    <Input
                      placeholder="Họ"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <FormErrorMessage>
                        {errors.firstName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl id="lastName" isInvalid={!!errors.lastName}>
                    <FormLabel display="flex" alignItems="center">
                      <Icon as={IoMdPerson} mr={2} />
                      Tên
                    </FormLabel>
                    <Input
                      placeholder="Tên"
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && (
                      <FormErrorMessage>
                        {errors.lastName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>

                <FormControl id="hobby" isInvalid={!!errors.hobby}>
                  <FormLabel display="flex" alignItems="center">
                    <Icon as={MdOutlineFavorite} mr={2} />
                    Thời gian yêu thích trong ngày
                  </FormLabel>
                  <InputGroup>
                    <Select {...register("hobby", { required: true })}>
                      {hobbies.items.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                  <FormErrorMessage>{errors.hobby?.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel display="flex" alignItems="center">
                    <Icon as={MdEmail} mr={2} />
                    Email
                  </FormLabel>
                  <Input
                    disabled={true}
                    type="email"
                    {...register("email", { required: true })}
                    autoComplete="current-email"
                    placeholder="example@gmail.com"
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <Divider borderColor="gray.300" borderWidth="1px" />
              </Stack>

              <Stack spacing={6} direction={"row"} p={6}>
                <Button disabled={isLoadingEdit} w="full" onClick={handleReset}>
                  Hủy bỏ
                </Button>
                <Button
                  colorScheme="blue"
                  w="full"
                  type="submit"
                  isDisabled={!isDirty || isLoadingEdit}
                >
                  Lưu
                </Button>
              </Stack>
            </form>
          </GridItem>
        </Grid>
      </Stack>
    </Flex>
  );
}
