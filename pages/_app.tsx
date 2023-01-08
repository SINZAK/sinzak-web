import "../styles/globals.css";
import type { AppProps } from "next/app";
import { globalFont } from "lib/services/font";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${globalFont.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
