import { createTRPCRouter } from '../server';
import { authRouter } from './router/auth';
import { guildRouter } from './router/guild';

export const appRouter = createTRPCRouter({
  guild: guildRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
