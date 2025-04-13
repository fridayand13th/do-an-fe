import { Avatar, Spinner } from '@chakra-ui/react';
import { meSelector } from '@stores/me';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '@styles/components/header.module.scss';
import { useRouter } from 'next/dist/client/router';
import HeaderInfoList from '@components/header/header-info-list';
import useMobile from '@hooks/useMobile';
import useSidebar from '@hooks/useSidebar';
import { IoMdMenu } from 'react-icons/io';


export default function Header() {
  const router = useRouter();

  const [isClickInfo, setIsClickInfo] = useState(false);
  const {avtUrl, firstName} = useSelector(meSelector);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined | null>(null);
  const [selectMenu, setSelectMenu] = useState<string>();

  const { isSidebarOpen, close, toggle } = useSidebar(); 
  const isMobile = useMobile();

  const handleInfoClick = () => {
    if(isMobile){
      close()
    }
    setIsClickInfo((prev) => !prev);
  };

  const handleInfoBlur = () => {
    setIsClickInfo(false);
  };
  const handleRoute = (path: string) => {
    router.push({ pathname: path });
    if (isSidebarOpen) close();
  };

  useEffect(() => {
    const { pathname } = router;
    const pathnames = pathname.split('/').filter((path) => path !== '');
    setSelectMenu('/' + pathnames[0]);
  }, [router.pathname]);

  useEffect(() => {
    if (avtUrl !== null) {
      setAvatarSrc(avtUrl)
    }
  }, [ avtUrl]);



  return (
    <header className={`${styles.headerContainer} ${isSidebarOpen && isMobile ? styles.navMobileContainerOpen : ''}`}>
      <div className={styles.headerWrap}>
        <div className={styles.headerAvatar}>
          <button
            onClick={handleInfoClick}
            onBlur={handleInfoBlur}
            className={styles.headerControlContainer}
          >
            {(avatarSrc !== null) ? (
              <Avatar 
                src={avatarSrc} 
                bg={"blue.500"}
                color={"white"} 
              />
            )
            : (
                <Spinner size="xl" color="blue.500" my={10} />
              )}
            {isClickInfo && <HeaderInfoList handleRoute={handleRoute} />}
          </button>
        </div>
        {isMobile && (
          <button
            className={styles.navToggleButton}
            onClick={toggle}
            aria-label="Toggle Navigation"
          >
            <IoMdMenu />
          </button>
        )}
      </div>
    </header>
  );
}
