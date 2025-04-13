import { FlexProps } from '@chakra-ui/react';

export type TBasisProps = {
  children: React.ReactNode[] | React.ReactNode;
  basis: string | string[];
  columnGap?: string;
  width?: string;
  direction?: FlexProps['direction'];
  alignItems?: FlexProps['alignItems'];
};
