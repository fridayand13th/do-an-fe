import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { useSession } from "next-auth/react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Input,
    Skeleton,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import NotificationCard from "@components/common/auth-noti-card";
import AuthCard from "@components/common/cards/auth-card";
import { requestForgotPassword } from "@containers/verify/query";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@utils/common";
import { emailScheme } from "@validation/auth";

export default function ForgotPasswordPage() {
    const toast = useToast();
    const { status } = useSession();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { mutateAsync: forgotPassword, isLoading } = requestForgotPassword();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(emailScheme),
        mode: "onSubmit",
        defaultValues: {
            email: "",
        },
    });

    const onSubmitValid = async (values: any) => {
        try {
            await forgotPassword(values.email);
            setIsSubmitted(true);
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


    return (
        <>
            {status !== "authenticated" ? (
                isSubmitted ? (
                    <NotificationCard
                        icon={MdEmail}
                        title="Kiểm tra email của bạn"
                        description="Một liên kết xác nhận đã được gửi đến email của bạn. Vui lòng kiểm tra email của bạn và làm theo hướng dẫn."
                        redirectLink="/sign-in"
                        redirectText="Trở về trang đăng nhập"
                    />
                ) : (
                    <AuthCard>
                        <Stack align={"center"}>
                            <Heading fontSize={"4xl"} color="blue.600"><span>Đặt lại mật khẩu</span></Heading>
                            <Text fontSize={"md"} color={"gray.600"} textAlign="center" maxW="350px">
                                <span>Nhập email của bạn và liên kết đặt lại mật khẩu sẽ được gửi cho bạn.</span>
                            </Text>
                        </Stack>

                        <Box p={8}>
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                                    <GridItem colSpan={2}>
                                        <FormControl id="email" isInvalid={!!errors.email}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdEmail} mr={2} />
                                                <span>
                                                    Email
                                                </span>
                                            </FormLabel>
                                            <Input
                                                type="email"
                                                {...register("email", { required: true })}
                                                autoComplete="current-email"
                                                placeholder="Email"
                                            />
                                            <FormErrorMessage>
                                                <span>
                                                    {errors.email && errors.email.message}
                                                </span>
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button
                                            isLoading={isLoading}
                                            loadingText="Đang gửi..."
                                            colorScheme="blue"
                                            type="submit"
                                            width="full"
                                            transition="all 0.3s ease-in-out"
                                            _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                                        >
                                            <span>
                                                Gửi liên kết
                                            </span>
                                        </Button>
                                    </GridItem>
                                </Grid>
                            </form>
                        </Box>
                    </AuthCard>
                )
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


