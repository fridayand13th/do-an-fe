import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  Collapse,
  Wrap,
  WrapItem,
  Spacer,
} from "@chakra-ui/react";
import { useCRUDTaskByGemini } from "@containers/chat-box/query";
import { useCreateTask } from "@containers/task/query";
import { useState } from "react";
import { FiMessageCircle, FiX, FiTrash2 } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  taskSuggestion?: IUpdateTask;
};

type ChatWidgetProps = {
  onTaskCreated?: () => void;
};

export enum TaskAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  FIND = "find",
  SUGGEST = "suggest",
}

const suggestedPrompts = [
  "Làm thế nào để cập nhật công việc?",
  "Làm thế nào để xóa công việc?",
  "Làm cách nào để tạo công việc?",
  "Bạn có thể làm gì?",
];

export interface IUpdateTask {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
}

const ChatWidget = ({ onTaskCreated }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: useCRUDMutation } = useCRUDTaskByGemini();
  const { mutateAsync: createTaskMutation } = useCreateTask();

  const [isSuggestion, setIsSuggestion] = useState(false);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const data = await useCRUDMutation({ prompt: text });
      const { task: response, method, message } = data.data.data;
      let responseText = "";

      const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (message) {
        responseText = message;
      }

      if (response) {
        if (method === TaskAction.SUGGEST) {
          const taskData: IUpdateTask = {
            name: response.name,
            startDate: response.startDate,
            endDate: response.endDate,
            status: response.status,
          };
          setIsSuggestion(true);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: "",
              sender: "bot",
              taskSuggestion: taskData,
            },
          ]);
          return;
        }

        if (Array.isArray(response)) {
          if (method === TaskAction.FIND) {
            responseText = response
              .map((task) => {
                const start = new Date(task.startDate!);
                const end = new Date(task.endDate!);
                const timeRange = `${timeFormatter.format(
                  start,
                )} - ${timeFormatter.format(end)}`;
                const formattedDate = dateFormatter.format(start);
                return `🔹 ${task.name}\n🕒 ${timeRange} ngày ${formattedDate}`;
              })
              .join("\n\n");
            responseText = `✅ Tìm thấy ${response.length} công việc:\n\n${responseText}`;
          }
        } else {
          const start = new Date(response.startDate!);
          const end = new Date(response.endDate!);
          const timeRange = `${timeFormatter.format(
            start,
          )} - ${timeFormatter.format(end)}`;
          const formattedDate = dateFormatter.format(start);

          switch (method) {
            case TaskAction.CREATE:
              responseText = `✅ Đã tạo công việc: \n${response.name}\n🕒 ${timeRange} ngày ${formattedDate}`;
              onTaskCreated?.();
              break;
            case TaskAction.UPDATE:
              responseText = `✅ Đã cập nhật công việc: \n${response.name}\n🕒 ${timeRange} ngày ${formattedDate}`;
              break;
            default:
              responseText = message;
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: responseText,
          sender: "bot",
        },
      ]);
    } catch (err) {
      console.error("Lỗi từ API:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "❌ Đã xảy ra lỗi. Vui lòng thử lại sau.",
          sender: "bot",
        },
      ]);
    }
  };

  const confirmSuggestion = async (task: IUpdateTask) => {
    try {
      await createTaskMutation(task);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: `✅ Đã thêm công việc: ${task.name}`,
        },
      ]);
      onTaskCreated?.();
      setIsSuggestion(false);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: "❌ Không thể tạo công việc. Vui lòng thử lại.",
        },
      ]);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);
  const clearMessages = () => setMessages([]);

  const bgColor = useColorModeValue("blue.50", "blue.900");

  return (
    <>
      <IconButton
        icon={<FiMessageCircle />}
        aria-label="Open chat"
        onClick={toggleChat}
        colorScheme="blue"
        borderRadius="full"
        position="fixed"
        bottom="4"
        right="4"
        zIndex="1000"
        boxSize="60px"
        fontSize="24px"
        boxShadow="xl"
      />

      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          bottom="20"
          right="4"
          width="400px"
          h="500px"
          maxH="80vh"
          bg={bgColor}
          borderRadius="2xl"
          boxShadow="2xl"
          display="flex"
          flexDirection="column"
          zIndex="999"
          overflow="hidden"
        >
          <HStack px={4} py={3} borderBottom="1px solid #e2e8f0">
            <Text fontWeight="bold" fontSize="lg">
              Ask Friday...
            </Text>
            <Spacer />
            <IconButton
              icon={<FiTrash2 />}
              aria-label="Clear chat"
              size="sm"
              variant="ghost"
              onClick={clearMessages}
            />
            <IconButton
              icon={<FiX />}
              aria-label="Close chat"
              size="sm"
              variant="ghost"
              onClick={toggleChat}
            />
          </HStack>

          <VStack
            spacing={2}
            px={4}
            py={2}
            overflowY="auto"
            align="stretch"
            fontSize="sm"
            flex={1}
          >
            {messages.map((msg) =>
              msg.taskSuggestion && isSuggestion ? (
                <Box
                  key={msg.id}
                  bg="blue.400"
                  color="white"
                  borderRadius="xl"
                  px={4}
                  py={3}
                  boxShadow="md"
                >
                  <Text fontWeight="bold" mb={2}>
                    Có vẻ như bạn đã có công việc trong khoảng thời gian này.
                    Bạn có muốn tạo lịch mình đề xuất dưới đây không?
                  </Text>
                  <Box
                    bg="blue.600"
                    borderRadius="md"
                    px={3}
                    py={2}
                    mb={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="bold">{msg.taskSuggestion?.name}</Text>
                    <Text fontSize="sm">
                      {new Intl.DateTimeFormat("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }).format(new Date(msg.taskSuggestion?.startDate!))}{" "}
                      -{" "}
                      {new Intl.DateTimeFormat("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }).format(new Date(msg.taskSuggestion?.endDate!))}
                    </Text>
                  </Box>
                  <HStack
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      w="40%"
                      bg="blue.500"
                      _hover={{ bg: "blue.600" }}
                      onClick={() => confirmSuggestion(msg.taskSuggestion!)}
                      color="white"
                      borderRadius="lg"
                      mb={2}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      w="40%"
                      bg="red.500"
                      _hover={{ bg: "red.600" }}
                      onClick={() => {
                        setIsSuggestion(false);
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now(),
                            sender: "bot",
                            text: "🤖 Mình có thể giúp bạn được gì không?",
                          },
                        ]);
                      }}
                      color="white"
                      borderRadius="lg"
                    >
                      Từ chối
                    </Button>
                  </HStack>
                </Box>
              ) : (
                <Box
                  key={msg.id}
                  alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                  bg={msg.sender === "user" ? "blue.500" : "gray.200"}
                  color={msg.sender === "user" ? "white" : "black"}
                  px={4}
                  py={2}
                  borderRadius="xl"
                  maxW="75%"
                  wordBreak="break-word"
                >
                  <Text whiteSpace="pre-line">{msg.text}</Text>
                </Box>
              ),
            )}
          </VStack>

          {messages.length === 0 && (
            <Wrap px={4} pt={4} spacing={2} height={"100%"}>
              {suggestedPrompts.map((prompt, idx) => (
                <WrapItem key={idx}>
                  <Button
                    size="sm"
                    variant="outline"
                    borderRadius="full"
                    colorScheme="blue"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          )}

          <HStack px={4} py={3} borderTop="1px solid #e2e8f0" bg="blue.100">
            <Input
              placeholder="Ask Friday..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              fontSize="sm"
              bg="white"
              borderRadius="full"
            />
            <Button
              onClick={() => handleSend()}
              colorScheme="blue"
              borderRadius="full"
            >
              <MdArrowForward />
            </Button>
          </HStack>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatWidget;
