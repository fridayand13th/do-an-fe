import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Loading from "@components/common/loading";
import AuthValid from "@components/guards/auth-valid";
import PopupContainer from "src/containers/commons/popup";
import { LoadingProvider, useLoadingContext } from "@contexts/loadingContext";
import theme from "@definitions/chakra/theme";
import { wrapper } from "@stores/store";
import "@styles/globals.scss";
import 'nprogress/nprogress.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../public/static/fonts/style.css';
import '../styles/components/date-picker.scss';


function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  const [sessionRefetchInterval, setSessionRefetchInterval] =
    useState<number>(60);

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={sessionRefetchInterval}
    >
      <LoadingProvider>
        <ChakraProvider
          resetCSS={true}
          theme={theme}
          toastOptions={{ defaultOptions: { position: "top-right" } }}
        >
          <QueryClientProvider client={client}>
            <Hydrate state={pageProps?.dehydratedState}>
              <CSSReset />
              <AuthValid setSessionRefetchInterval={setSessionRefetchInterval}>
                <RouteChangeHandler /> 
                <Component {...pageProps} />
                <PopupContainer />
              </AuthValid>
            </Hydrate>
          </QueryClientProvider>
        </ChakraProvider>
      </LoadingProvider>
    </SessionProvider>
  );
}

function RouteChangeHandler() {
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoadingContext();

  useEffect(() => {
    const handleRouteChange = () => {
      startLoading();
    };
    const handleRouteComplete = () => {
      const delay = 1000; // Set the delay duration (in milliseconds)
      setTimeout(() => {
        stopLoading(); // Stop loading after the delay
      }, delay);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router, startLoading, stopLoading]);

  return loading ? <Loading /> : null;
}

export default wrapper.withRedux(MyApp);
