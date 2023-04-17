import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { api } from "~/utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </main>
  );
}

export default api.withTRPC(App);
