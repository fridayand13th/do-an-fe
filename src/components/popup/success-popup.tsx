import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

function SuccessPopup({
    props: { onClose },
}: Readonly<{
    props: {
        onClose: () => void;
    };
}>) {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Success</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="center">
                        <FaCheck size={48} color="green.200" />
                        <Text fontSize="lg" color="gray.700" textAlign="center">
                            요청이 제출되었습니다. 관리자의 승인을 기다려 주세요.
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SuccessPopup;
