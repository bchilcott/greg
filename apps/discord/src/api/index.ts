import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

import type { AppRouter } from '@greg/api';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:3000`; // dev SSR should use localhost
};

const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getBaseUrl() + '/api/trpc',
      // You can pass any HTTP headers you wish here
    }),
  ],
});

export default api;
export { type RouterInputs, type RouterOutputs } from '@greg/api';
