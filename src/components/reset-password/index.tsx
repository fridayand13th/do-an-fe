import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/router";
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
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import AuthCard from "@components/common/cards/auth-card";
import { resetPassword } from "@containers/verify/query";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@utils/common";
import { resetPasswordSchema } from "@validation/auth";

export default function ResetPasswordForm({ token }: { token: string }) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();
    const { mutateAsync: resetPasswordRequest, isLoading } = resetPassword();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onSubmit",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmitValid = async (values: any) => {
        try {
            await resetPasswordRequest({ token, password: values.password });
            toast({
                title: 'Mật khẩu của bạn đã được đặt lại. Vui lòng đăng nhập..',
                position: 'top-right',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            router.push('/sign-in');
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
        <AuthCard>
            <Stack align={"center"}>
                <Heading fontSize={"4xl"} color="blue.600">Đặt lại mật khẩu </Heading>
                <Text
                    fontSize={"md"}
                    color={"gray.600"}
                    textAlign="center"
                    maxW="350px"
                >
                    Nhập mật khẩu mới của bạn dưới đây để đặt lại mật khẩu cho tài khoản của bạn.
                </Text>
            </Stack>

            <Box p={8}>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <GridItem colSpan={2}>
                            <FormControl id="password" isInvalid={!!errors.password}>
                                <FormLabel display="flex" alignItems="center">
                                    <Icon as={MdLock} mr={2} />
                                    Mật khẩu mới
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", { required: true })}
                                        placeholder="Mật khẩu mới"
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
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                                <FormLabel display="flex" alignItems="center">
                                    <Icon as={MdLock} mr={2} />
                                    Xác nhận mật khẩu
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirmPassword", { required: true })}
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                            onClick={() => setShowConfirmPassword(prev => !prev)}
                                            aria-label="Toggle password visibility"
                                            variant="link"
                                            size="sm"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
                                Đặt lại mật khẩu
                            </Button>
                        </GridItem>
                    </Grid>
                </form>
            </Box>
        </AuthCard>
    );
}

