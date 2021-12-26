import type { AppProps } from "next/app";
import { DappProvider } from "../contexts/DappContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DappProvider>
      <Component {...pageProps} />;
    </DappProvider>
  );
}

export default MyApp;
