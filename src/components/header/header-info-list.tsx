import { signOut } from 'next-auth/react';
import { Box, Divider, Stack } from '@chakra-ui/react';
import Username from '@components/common/username';
import styles from '@styles/components/header.module.scss';

export default function HeaderInfoList({
  handleRoute,
}: {
  handleRoute: (path: string) => void;
}) {
  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("hasRefreshedToken");
    }
    await signOut({ redirect: true, callbackUrl: '/sign-in' });
  };

  return (
    <Box className={styles.controlContainer}>
      <Stack divider={<Divider className="my-4" />}>
        <div className={styles.subscribedServiceName}>
          <Username />
        </div>
        <Box>
          <ul>
            <li onClick={handleLogout}>
              <p className={styles.headerInfoMenuItem}>Đăng xuất</p>
            </li>
          </ul>
        </Box>
      </Stack>
    </Box>
  );
}
