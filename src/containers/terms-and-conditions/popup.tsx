import { SetStateAction, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MOCK_TERMS_AND_CONDITIONS } from "@mock/index";

function TermsAndConditionsPopup({
  props: { setIsAgreed, onClose },
}: {
  props: {
    setIsAgreed: (value: SetStateAction<boolean>) => void;
    onClose: () => void;
  };
}) {
  const [canAccept, setCanAccept] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (modalBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setCanAccept(true);
      }
    }
  };

  const handleAgree = () => {
    setIsAgreed(true);
    onClose();
  };

  const handleDecline = () => {
    setIsAgreed(false);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Điều khoản và điều kiện</ModalHeader>{" "}
        {/* Terms and Conditions */}
        <ModalCloseButton />
        <ModalBody
          ref={modalBodyRef}
          onScroll={handleScroll}
          maxH="70vh"
          overflowY="auto"
        >
          <VStack align="start" spacing={4} mb={8}>
            <Text fontWeight="bold" fontSize="lg">
              Điều khoản
            </Text>{" "}
            {/* Terms */}
            {MOCK_TERMS_AND_CONDITIONS.filter(
              (item) => item.type === "term",
            ).map((item) => (
              <VStack align="start" key={item.id} spacing={2} mb={2}>
                <Text fontWeight="bold">{item.section}</Text>
                <Text>{item.content}</Text>
              </VStack>
            ))}
          </VStack>

          <Box width="100%" overflowX="hidden">
            <Divider
              borderColor="gray.300"
              borderWidth="1px"
              my={4}
              width="100%"
            />
          </Box>

          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="lg">
              Điều kiện
            </Text>{" "}
            {/* Conditions */}
            {MOCK_TERMS_AND_CONDITIONS.filter(
              (item) => item.type === "condition",
            ).map((item) => (
              <VStack align="start" key={item.id} spacing={2} mb={2}>
                <Text fontWeight="bold">{item.section}</Text>
                <Text>{item.content}</Text>
              </VStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Box display="flex" justifyContent="space-between">
            <Button
              colorScheme="blue"
              onClick={handleAgree}
              isDisabled={!canAccept}
              mr={3}
            >
              Chấp nhận {/* Accept */}
            </Button>
            <Button onClick={handleDecline}>Từ chối {/* Decline */}</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TermsAndConditionsPopup;
