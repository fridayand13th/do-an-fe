import { TPopupProps } from "@@types/components/commons/popup";
import { Box, Button, Text } from "@chakra-ui/react";

const HelpPopupComponent = ({
  props: { message },
  closePopup,
}: TPopupProps<{ message: string }>) => (
  <Box p="4" bg="white" borderRadius="md" shadow="md">
    <Text mb="4">{message}</Text>
    <Button colorScheme="blue" onClick={closePopup}>
      OK
    </Button>
  </Box>
);

export default HelpPopupComponent;
