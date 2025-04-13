import { FC } from "react";
import DatePicker from "react-datepicker";
import { IoMdRemove } from "react-icons/io";
import { FormControl, FormLabel, IconButton } from "@chakra-ui/react";

interface DatePickerWithClearProps {
    label: string;
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const DatePickerWithClear: FC<DatePickerWithClearProps> = ({
    label,
    selectedDate,
    onChange,
    minDate,
    maxDate,
}) => {
    const clearDate = () => onChange(null);

    return (
        <FormControl display="flex" justifyContent="center" position="relative">
            <FormLabel mb="0" whiteSpace="nowrap" mr={4} display="flex" alignItems="center">
                {label}
            </FormLabel>
            <div style={{ position: "relative" }}>
                <DatePicker
                    selected={selectedDate}
                    onChange={onChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat="MM/dd/yyyy"
                    className="react-datepicker"
                />
                {selectedDate && (
                    <IconButton
                        aria-label={`Clear ${label.toLowerCase()}`}
                        icon={<IoMdRemove />}
                        size="xs"
                        onClick={clearDate}
                        w="20px"
                        position="absolute"
                        top="50%"
                        transform="translateY(-50%)"
                        right="10px"
                        bg="transparent"
                    />
                )}
            </div>
        </FormControl>
    );
};

export default DatePickerWithClear;
