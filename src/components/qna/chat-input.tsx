import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { Box, FormControl, FormErrorMessage, HStack, IconButton, Textarea } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "@validation/message";

export default function ChatInput({ response }: { response: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(messageSchema),
    });
    const messageValue = watch("message");
    const onSubmit = async (values: any) => {

    };
    const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "50px";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    useEffect(() => {
        setValue("message", response);
    }, [response, setValue]);

    return (
        <Box w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack spacing={3} w="100%" align="flex-start">
                    <FormControl id="response" isInvalid={!!errors.message}>
                        <Textarea
                            size="sm"
                            bg="white"
                            minH="50px"
                            borderRadius="md"
                            overflow="hidden"
                            focusBorderColor="blue.300"
                            {...register("message")}
                            placeholder="답변을 입력하세요..."
                            onInput={handleResize}
                            resize="none"
                        />
                        <FormErrorMessage>
                            {errors.message && errors.message.message}
                        </FormErrorMessage>
                    </FormControl>
                    <IconButton
                        icon={<MdSend />}
                        size="lg"
                        isDisabled={!messageValue?.trim()}
                        colorScheme="blue"
                        aria-label="답변 전송"
                        type="submit"
                    />

                </HStack>
            </form>
        </Box>

    )
}
