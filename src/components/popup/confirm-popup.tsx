import { Box, Button, Text } from "@chakra-ui/react";

const ConfirmUsagePopup = ({
  props: { onConfirm, infoBox },
  closePopup,
}: {
  props: {
    onConfirm: () => void;
    infoBox: { title: string; content: string; point: string };
  };
  closePopup: () => void;
}) => {
  const handleConfirm = () => {
    console.log("Final confirmation");
    onConfirm(); // Final confirmation
    closePopup(); // Close the popup
  };

  const handleCancel = () => {
    closePopup();
  };
  return (
    <Box borderWidth="1px" borderRadius="lg" p={2} boxShadow="lg">
      <Box mb={4} p={6} bg="white" maxW="md" mx="auto">
        <Box
          // mb="6"
          p="6"
          bg="blue.50"
          border="1px"
          borderColor="blue.200"
          borderRadius="md"
          boxShadow="sm"
          height={200}
          w="100%"
          textAlign={"center"}
        >
          <Text fontSize="2xl" fontWeight="bold" mb="4" color="blue.800">
            {infoBox.title}
          </Text>
          <Text fontSize="md" color="gray.700" mb="4">
            {infoBox.content}
          </Text>
          <Text textAlign="center" color="gray.600" mb="6">
            현재 보유중인 포인트:{" "}
            <Text as="span" fontWeight="bold" color="blue.800">
              {infoBox.point}
            </Text>
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" pb={2}>
        <Button variant="outline" mr={3} onClick={handleCancel}>
          취소
        </Button>
        <Button colorScheme="blue" onClick={handleConfirm}>
          업로드
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmUsagePopup;