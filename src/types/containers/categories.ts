import { TPopupProps } from '@@types/components/commons/popup';

export type TCategoryCreatePopupProps = TPopupProps<{
  defaultValues: {
    name: string;
    order: number;
    message: string;
    id?: number;
  };
}>;
