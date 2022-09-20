import type { AppProps } from "next/app";
import ThirdwebGuideFooter from "../components/guide/ThirdwebGuideFooter";
import Header from "../components/Header";
import { WalletContextProvider } from "../contexts/ContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Header />
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </WalletContextProvider>
  );
}

export default MyApp;
