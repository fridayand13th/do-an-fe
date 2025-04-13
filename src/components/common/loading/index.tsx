import { Box, Flex, Text, keyframes } from "@chakra-ui/react";
// Define the keyframes for the dot animation
const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;
const Loading = () => {
    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="rgba(255, 255, 255, 0.6)" // Slightly stronger overlay
            zIndex="9999"
            transition="background-color 0.3s ease" // Smooth transition for the background
        >
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={6}
            >
                <Flex justifyContent="center" mt={2}>
                    {/* Three dots */}
                    <Box
                        width="12px"
                        height="12px"
                        borderRadius="50%"
                        backgroundColor="blue.500"
                        animation={`${bounceAnimation} 0.6s infinite`}
                        mx={1}
                    />
                    <Box
                        width="12px"
                        height="12px"
                        borderRadius="50%"
                        backgroundColor="blue.500"
                        animation={`${bounceAnimation} 0.6s infinite 0.2s`}
                        mx={1}
                    />
                    <Box
                        width="12px"
                        height="12px"
                        borderRadius="50%"
                        backgroundColor="blue.500"
                        animation={`${bounceAnimation} 0.6s infinite 0.4s`}
                        mx={1}
                    />
                </Flex>
                <Text fontSize="xl" mt={4} fontWeight="bold" color="gray.700">
                    Đang tải...
                </Text>
            </Flex>
        </Flex>
    );
};
export default Loading;