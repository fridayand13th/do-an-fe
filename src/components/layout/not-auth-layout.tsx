import { Box, Flex } from '@chakra-ui/react';
import { NextjsIcon } from '@components/icons';
import styles from '@styles/layouts/not-auth-layout.module.scss';

export default function NotAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.background2}>
      <div className={'relative flex flex-col flex-1 w-full h-full overflow-hidden bg-pink'}>
        <Flex minH={"100vh"} align={"center"} justify={"center"} direction="column">
          {children}
        </Flex >
      </div>
    </div>
  );
}
