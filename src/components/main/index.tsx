import useMobile from '@hooks/useMobile';
import useSidebar from '@hooks/useSidebar';
import styles from '@styles/layouts/layout.module.scss';

export function Main({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  const { isSidebarOpen, close } = useSidebar();

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div className={styles.overlay} onClick={close}></div>
      )}
      <main
        className={`${styles.mainContainer} ${isMobile ? styles.mobileMainContainer : ''} ${isMobile && isSidebarOpen ? styles.noScroll : ''}`}
      >
        {children}
      </main>
    </>
  );
}
