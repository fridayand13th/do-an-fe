import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { signOut } from "next-auth/react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import AuthCard from "@components/common/cards/auth-card";
import { changePassword } from "@containers/account/query";
import { yupResolver } from "@hookform/resolvers/yup";
import useMobile from "@hooks/useMobile";
import { getErrorMessage } from "@utils/common";
import { changePasswordSchema } from "@validation/auth";

export default function ChangePassword() {
    const isMobile = useMobile();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutateAsync: changePasswordRequest, isLoading } = changePassword();

    const onSubmitValid = async (values: any) => {  
        try {
            await changePasswordRequest({currentPassword: values.currentPassword , password: values.password});
            toast({
                title: "Đổi mật khẩu thành công.",
                status: "success",
                position: "top-right",
                duration: 5000,
                isClosable: true,
            });
            setTimeout(async () => {
                await signOut({ redirect: true, callbackUrl: '/sign-in' });
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

    return (
        <Flex my={12} align={"center"} justify={"center"} direction="column">
            <AuthCard>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} color="blue.600">
                        Đổi mật khẩu
                    </Heading>
                    <Text
                        fontSize={"sm"}
                        color={"gray.600"}
                        textAlign="center"
                        maxW="350px"
                    >
                        Vui lòng nhập mật khẩu mới. 
                    </Text>
                </Stack>
                <Box py={8} px={isMobile? 2: 8}>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem colSpan={2}>
                                <FormControl id="currentPassword" isInvalid={!!errors.currentPassword}>
                                    <FormLabel display="flex" alignItems="center">
                                        <Icon as={MdLock} mr={2} />
                                        Mật khẩu hiện tại
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            {...register("currentPassword", { required: true })}
                                            placeholder="Mật khẩu hiện tại"
                                        />
                                        <InputRightElement>
                                            <Icon
                                                as={showCurrentPassword ? MdVisibility : MdVisibilityOff}
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                cursor="pointer"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
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
                                            <Icon
                                                as={showPassword ? MdVisibility : MdVisibilityOff}
                                                onClick={() => setShowPassword(!showPassword)}
                                                cursor="pointer"
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
                                        Xác nhận mật khẩu mới
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword", { required: true })}
                                            placeholder="Xác nhận mật khẩu mới"
                                        />
                                        <InputRightElement>
                                            <Icon
                                                as={showConfirmPassword ? MdVisibility : MdVisibilityOff}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                cursor="pointer"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Button
                                    isLoading={isLoading}
                                    loadingText="Đang lưu..."
                                    colorScheme="blue"
                                    type="submit"
                                    width="full"
                                    transition="all 0.3s ease-in-out"
                                    _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                                >
                                    Lưu thay đổi
                                </Button>
                            </GridItem>
                        </Grid>
                    </form>
                </Box>
            </AuthCard>
        </Flex>
    );
}


async function fakeApiCall(email: string) {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 2000));
}
