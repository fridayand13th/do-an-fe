import { AlertDialogProps, DrawerProps, ModalProps } from '@chakra-ui/react';
export type TPopupProps<T> = {
  props: T;
  closePopup: () => void;
};

export type TConfirmProps = {
  isOpen: boolean;
  closePopup: () => void;
  props: Record<string, any>;
  children: React.ReactNode;
  popupOptions?: Omit<
    DrawerProps | ModalProps | AlertDialogProps,
    'isOpen' | 'closePopup'
  >;
  mediaQuery?: string;
};

export type TModalProps = {
  isOpen: boolean;
  closePopup: () => void;
  props: Record<string, any>;
  children: React.ReactNode;
  popupOptions?: Omit<
    DrawerProps | ModalProps | AlertDialogProps,
    'isOpen' | 'closePopup'
  >;
  mediaQuery?: string;
};

export type TDrawerProps = {
  isOpen: boolean;
  closePopup: () => void;
  props: Record<string, any>;
  children: React.ReactNode;
  popupOptions?: Omit<
    DrawerProps | ModalProps | AlertDialogProps,
    'isOpen' | 'closePopup' | 'size' | 'placement'
  > & {
    size?:
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | 'xs'
      | 'full'
      | '3xl'
      | '4xl'
      | '5xl'
      | '6xl'
      | undefined;
    placement?: 'top' | 'right' | 'bottom' | 'left' | undefined;
  };
  mediaQuery?: string;
};
