import { Box, Input, MenuItemProps, useMenuItem } from '@chakra-ui/react';

export default function MenuInput({
  inputOnChange,
  max,
  ...props
}: MenuItemProps & {
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max: number;
}) {
  return (
    <Box mx="2">
      <Input
        px="3"
        boxSizing="border-box"
        placeholder={`직접 입력(최대 ${max}개)`}
        size="sm"
        width="12.5rem"
        type="number"
        onChange={inputOnChange}
      />
    </Box>
  );
}
