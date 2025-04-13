import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { TConfirmProps } from '@@types/components/commons/popup';

export default function Confirm({
  isOpen,
  closePopup,
  children,
  popupOptions,
}: TConfirmProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      {...popupOptions}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={closePopup}
      closeOnEsc
    >
      <AlertDialogOverlay>
        <AlertDialogContent>{children}</AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
