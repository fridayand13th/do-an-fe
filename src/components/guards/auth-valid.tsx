import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@components/common/loading";
import Layout from "@components/layout/layout";
import NotAuthLayout from "@components/layout/not-auth-layout";
import { loaderSelector } from "@stores/loader";

type AuthValidProps = {
  children: React.ReactNode;
  setSessionRefetchInterval: (interval: number) => void;
};

type AuthComponentProps = {
  children: React.ReactNode;
};

function Authenticated({ children }: AuthComponentProps) {
  return <Layout>{children}</Layout>;
}

function Unauthenticated({ children }: AuthComponentProps) {
  return <NotAuthLayout>{children}</NotAuthLayout>;
}

export default function AuthValid({ children, setSessionRefetchInterval }: AuthValidProps)  {
  const { status, data: session } = useSession();
  const router = useRouter();
 

  useEffect(() => {
    console.log("Auth Status:", status);
    console.log("Current Path:", router.pathname);
  
    if ((status === "authenticated" && router.pathname.includes("auth")) || session?.error === "RefreshAccessTokenError") {
      signOut();
    } 
    else if (
      status === "unauthenticated" &&
      !router.pathname.startsWith("/sign-in") &&
      !router.pathname.includes("find") &&
      !router.pathname.includes("sign-up") && 
      !router.pathname.startsWith("/verify") 
    ) {
      router.replace("/landing-page");
    } 
    else if (
      status === "authenticated" &&
      (router.pathname.startsWith("/sign-in") ||
       router.pathname.includes("find") ||
       router.pathname.includes("sign-up") ||
       router.pathname.startsWith("/verify") ||
       router.pathname.includes("landing-page"))
    ) {
      router.replace("/");
    }
  
    if (session) {
      const nowTime = new Date().getTime();
      const timeRemaining = ((session as any).expires as number) - nowTime - 7 * 60 * 1000;
      setSessionRefetchInterval(timeRemaining > 0 ? timeRemaining : 500);
    }
  }, [session, status, router.pathname, setSessionRefetchInterval]);

  if (status === "loading") return <Loading />;

  if (
    router.pathname.startsWith("/sign-in") ||
    router.pathname.includes("find") ||
    router.pathname.includes("sign-up") ||
    router.pathname.startsWith("/verify") ||
    router.pathname.includes("landing-page")
  ) {
    return <Unauthenticated>{children}</Unauthenticated>;
  }
  if (status === "authenticated") {
    return router.pathname.includes("auth") ? (
      <>{children}</>
    ) : (
      <Authenticated>{children}</Authenticated>
    );
  }


  return null;
}
