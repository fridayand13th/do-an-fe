import { CardProps } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export type TServiceCardProps = {
  isEmpty?: boolean;
  title: string;
  buttonText?: string | React.ReactNode;
  children?: React.ReactNode;
  className: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};
