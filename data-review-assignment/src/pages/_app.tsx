import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TutorialProvider } from "../context/TutorialContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TutorialProvider>
      <Component {...pageProps} />
    </TutorialProvider>
  );
}
