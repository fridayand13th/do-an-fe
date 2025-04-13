import { Button, ButtonProps } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

export default function InfoButton({ ...infobuttonProps }: ButtonProps) {
  return (
    <Button
      className="bg-transparent text-success-500 p-0"
      {...infobuttonProps}
    >
      <FaInfoCircle />
    </Button>
  );
}
