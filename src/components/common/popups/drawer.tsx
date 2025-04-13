import { TDrawerProps } from '@@types/components/commons/popup';
import {
  DrawerContent,
  DrawerOverlay,
  Drawer as ChakraDrawer,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';
export default function Drawer({
  isOpen,
  children,
  closePopup,
  popupOptions,
}: TDrawerProps) {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={closePopup}
      size="sm"
      {...popupOptions}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {children}
      </DrawerContent>
    </ChakraDrawer>
  );
}
