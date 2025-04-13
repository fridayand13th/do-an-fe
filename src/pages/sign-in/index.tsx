import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";  // Import the eye icons
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Link,
  Skeleton,
  Stack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import AuthCard from "@components/common/cards/auth-card";
import { yupResolver } from "@hookform/resolvers/yup";
import { TSignIn } from "@@types/forms/sign-in";
import { loginSchema } from "@validation/auth";
import { getErrorMessage } from "@utils/common";

export default function LoginPage() {
  const toast = useToast();
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);  
  const hasRefreshedToken = sessionStorage.getItem("hasRefreshedToken");



  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignIn>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitValid = async (values: TSignIn) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result?.ok) {
        console.log("Login successful:", result);
        if (typeof window !== "undefined") {
          if (!hasRefreshedToken) {
            sessionStorage.setItem("hasRefreshedToken", "true");
          }
        }
        router.replace("/");
      } else if (result?.error) {
        toast({
          title: result.error,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toast({
        title: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status !== "authenticated" ? (
        <AuthCard>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="blue.600">Đăng nhập</Heading>
            <Text fontSize={"md"} color={"gray.600"} textAlign="center" maxW="350px">
            Nhập thông tin của bạn dưới đây để đăng nhập.
            </Text>
          </Stack>
          <Box rounded={"lg"} p={8}>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <GridItem colSpan={2}>
                  <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel display="flex" alignItems="center">
                      <Icon as={MdEmail} mr={2} />
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      {...register("email", { required: true })}
                      autoComplete="current-email"
                      placeholder="Email"
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl id="password" isInvalid={!!errors.password}>
                    <FormLabel display="flex" alignItems="center">
                      <Icon as={MdLock} mr={2} />Mât khẩu
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"} 
                        {...register("password", { required: true })}
                        autoComplete="current-password"
                        placeholder="Mât khẩu"
                      />
                      <InputRightElement>
                        <IconButton
                          icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />} 
                          onClick={() => setShowPassword(prev => !prev)} 
                          aria-label="Toggle password visibility"
                          variant="link"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Ghi nhớ thông tin đăng nhập của tôi</Checkbox>
                  </Stack>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    isLoading={loading}
                    loadingText="Đang đăng nhập..."
                    colorScheme="blue"
                    type="submit"
                    width="full"
                    transition="all 0.3s ease-in-out"
                    _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                  >
                    Đăng nhập
                  </Button>
                </GridItem>
              </Grid>
            </form>
            <Stack pt={4} align={"center"}>
              <Text fontSize={"sm"}>
                Bạn chưa có tài khoản?{" "}
                <Link color={"blue.400"} href="/sign-up">
                  Đăng ký ngay
                </Link>
              </Text>
              <Link color={"blue.400"} href="/sign-in/forgot-password">
                Quên mật khẩu?
              </Link>
            </Stack>
          </Box>
        </AuthCard>
      ) : (
        <Stack spacing={4}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Stack>
      )}
    </>
  );
}
