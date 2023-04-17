import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { api } from '~/utils/trpc';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </main>
  );
}

export default api.withTRPC(App);
