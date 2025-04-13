import { TPopupProps } from '@@types/components/commons/popup';

export type TTermsEditContainerProps = {
  termsid: number;
};

export type TTosModalProps = TPopupProps<{
  item: {
    title: string;
    content: string;
    id: number;
  };
  handleAgreeClick: (id: number) => void;
}>;

export type TTermsDeletePopupProps = TPopupProps<{ id: number; title: string }>;
