import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Header from "@components/header";
import { Main } from "@components/main";
import SimpleSidebar from "@components/sidebar";
import useMe from "@hooks/useMe";
import styles from "@styles/layouts/layout.module.scss";


export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  const { status, update } = useSession();
  const [load, setLoad] = useState(false);
  const hasRefreshedToken = sessionStorage.getItem("hasRefreshedToken");
  
  useMe();

  useEffect(() => {
    if (status === "authenticated" && hasRefreshedToken !== "true") {
      update({ hasRefreshedToken: hasRefreshedToken === "true" });
      sessionStorage.setItem("hasRefreshedToken", "true");
    }
  }, [status, hasRefreshedToken, update]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut();
    } else if (status === "authenticated") {
      setTimeout(() => setLoad(true), 0);
    }
  }, [status]);



  if (status !== "authenticated" || !load) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SimpleSidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Header/>
        </div>
        <Main>{children}</Main>
      </div>
    </div>
  );
}
