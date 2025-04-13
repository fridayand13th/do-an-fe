import { useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import DatePickerWithClear from "@components/common/date-picker";

function DateFilterPopup({
    props: { startDate, endDate, onConfirm, onClose },
}: Readonly<{
    props: {
        startDate: Date | null;
        endDate: Date | null;
        onConfirm: (tempStartDate: Date | null, tempEndDate: Date | null) => void;
        onClose: () => void;
    };
}>) {

    const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);

    const applyDateFilter = () => {
        onConfirm(tempStartDate, tempEndDate)
    }
    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>날짜 필터</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <DatePickerWithClear
                            label="시작 날짜"
                            selectedDate={tempStartDate}
                            onChange={setTempStartDate}
                            maxDate={tempEndDate ?? undefined}
                        />
                        <DatePickerWithClear
                            label="종료 날짜"
                            selectedDate={tempEndDate}
                            onChange={setTempEndDate}
                            minDate={tempStartDate ?? undefined}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={applyDateFilter}>
                        구하다
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DateFilterPopup;