import React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';



export default function PopupModal ({
  props: { isOpen, children, popupOptions },
  closePopup
}: {
  props: {
    isOpen: boolean;
    children: React.ReactNode;
    popupOptions?: any;
  };
  closePopup: () => void;
})  {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closePopup}
      closeOnEsc
      isCentered
      {...popupOptions}
    >
      <ModalOverlay>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalContent
            w={["80%", "60%", "50%"]} 
            maxW="1200px" 
            p={10}
          >
            {children}
          </ModalContent>
        </motion.div>
      </ModalOverlay>
    </Modal>
  );
};

