import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdPerson, MdVisibility, MdVisibilityOff, MdOutlineFavorite, MdCheckCircle  } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Select,
    Skeleton,
    Stack,
    Text,
    useToast 
} from "@chakra-ui/react";
import NotificationCard from "@components/common/auth-noti-card";
import AuthCard from "@components/common/cards/auth-card";
import TermsAndConditionsPopup from "@containers/terms-and-conditions/popup";
import { yupResolver } from "@hookform/resolvers/yup";
import usePopup from "@hooks/usePopup";
import { REGISTER } from "@apis/auth";
import { registerSchema } from "@validation/auth";
import { getErrorMessage } from "@utils/common";

const hobbies = {
    items: [
      { label: "Sáng", value: "sáng" },
      { label: "Chiều", value: "chiều" },
      { label: "Tối", value: "tối" },
    ],
  }

export default function RegisterPage() {
    const { status } = useSession();
    const toast = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); 
    const { openPopup, closePopup } = usePopup();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            hobby: "",
        },
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(e.target.checked);
    };

    const onSubmitValid = async (values: any) => {
        try {
        setLoading(true);
        await REGISTER({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            hobby: values.hobby,
        })
        setRegistrationSuccess(true)
        setLoading(false);
        }catch(error) {
            setLoading(false);
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

    const handleOpenTermsAndConditionsPopup = async () => {
        openPopup({
            isOpen: true,
            Component: TermsAndConditionsPopup,
            props: {
                setIsAgreed,
                onClose: closePopup,
            },
            type: 'confirm',
        });
    };



    return (
        <>
            {status !== "authenticated" ? (
                !registrationSuccess ? (
                    <AuthCard>
                        <Stack align={"center"}>
                            <Heading fontSize={"4xl"} color="blue.600">Tạo một tài khoản</Heading>
                            <Text fontSize={"md"} color={"gray.600"} textAlign="center" maxW="350px">
                            Vui lòng đăng ký bằng cách nhập thông tin của bạn bên dưới.
                            </Text>
                        </Stack>
                        <Box rounded={"lg"} p={8}>
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <Grid templateColumns={"repeat(2, 0.5fr)"} gap={3}>
                                    <GridItem colSpan={1}>
                                        <FormControl id="firstName" isInvalid={!!errors.firstName}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdPerson} mr={2} />
                                                Họ
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                {...register("firstName", { required: true })}
                                                placeholder="Họ"
                                            />
                                            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl id="lastName" isInvalid={!!errors.lastName}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdPerson} mr={2} />
                                                Tên
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                {...register("lastName", { required: true })}
                                                placeholder="Tên"
                                            />
                                            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl id="email" isInvalid={!!errors.email}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdEmail} mr={2} />
                                                Email
                                            </FormLabel>
                                            <Input
                                                type="email"
                                                {...register("email", { required: true })}
                                                placeholder="Email"
                                            />
                                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl id="password" isInvalid={!!errors.password}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdLock} mr={2} />
                                                Mật khẩu
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    {...register("password", { required: true })}
                                                    placeholder="Mật khẩu"
                                                />
                                                <InputRightElement>
                                                    <IconButton
                                                        icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />} 
                                                        onClick={() => setShowPassword((prev) => !prev)} 
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
                                                        icon={showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />} 
                                                        onClick={() => setShowConfirmPassword((prev) => !prev)} 
                                                        aria-label="Toggle confirm password visibility"
                                                        variant="link"
                                                        size="sm"
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl id="hobby" isInvalid={!!errors.hobby}>
                                            <FormLabel display="flex" alignItems="center">
                                                <Icon as={MdOutlineFavorite } mr={2} />
                                                Sở thích
                                            </FormLabel>
                                            <InputGroup>
                                                <Select  {...register("hobby", { required: true })}
                                                    placeholder="Chọn sở thích">
                                                    {hobbies.items.map((item) => (
                                                        <option key={item.value} value={item.value}>
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.hobby?.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl id="terms">
                                            <Checkbox onChange={handleCheckboxChange} isChecked={isAgreed}>
                                                <span>
                                                    {`Bằng cách chọn hộp này, bạn đồng ý với chúng tôi `}
                                                </span>
                                                <Link
                                                    color="blue.400"
                                                    cursor="pointer"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        handleOpenTermsAndConditionsPopup();
                                                    }}
                                                    _hover={{ textDecoration: "underline" }}
                                                >
                                                   các điều khoản và điều kiện
                                                </Link>
                                                <span>
                                                    {` của chúng tôi.`}
                                                </span>
                                            </Checkbox>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button
                                            isLoading={loading}
                                            loadingText="Đang gửi"
                                            colorScheme="blue"
                                            type="submit"
                                            width="full"
                                            disabled={!isAgreed}
                                            transition="all 0.3s ease-in-out"
                                            _hover={!isAgreed ? { boxShadow: "none", transform: "none" } : { transform: "scale(1.05)", boxShadow: "md" }}
                                        >
                                            Tạo tài khoản
                                        </Button>
                                    </GridItem>
                                </Grid>
                            </form>
                            <Stack pt={4} align={"center"}>
                                <Text fontSize={"sm"}>
                                    Đã có tài khoản?{" "}
                                    <Link color={"blue.400"} href="/sign-in">
                                        Đăng nhập
                                    </Link>
                                </Text>
                            </Stack>
                        </Box>
                    </AuthCard>
                ) : (
                    <NotificationCard
                        icon={MdCheckCircle}
                        title="Tạo tài khoản thành công!"
                        description="Cảm ơn vì đã sử dụng Friday."
                        redirectLink="/sign-in"
                        redirectText="Đăng nhập"
                    />
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
