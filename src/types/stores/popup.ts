import { AlertDialogProps, DrawerProps, ModalProps } from '@chakra-ui/react';

export type TPopupList =
  | 'confirm'
  | 'modal'
  | 'drawer'
  | 'promiseConfirm'
  | 'promiseModal'
  | 'promiseDrawer';
export type TPopupInitialState<T> = {
  type: T;
  props: Record<string, any>;
  isOpen: boolean;
  Component: React.ElementType<{ props: any; closePopup: any }>;
  popupOptions?: T extends 'confirm'
    ? Partial<Omit<AlertDialogProps, 'isOpen' | 'closePopup'>>
    : T extends 'modal'
    ? Partial<Omit<ModalProps, 'isOpen' | 'closePopup'>>
    : Partial<Omit<DrawerProps, 'isOpen' | 'closePopup'>>;
};
