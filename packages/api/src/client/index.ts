import { createTRPCRouter } from '../server';
import { authRouter } from './router/auth';
import { guildRouter } from './router/guild';
import { missionRouter } from './router/mission';

export const appRouter = createTRPCRouter({
  guild: guildRouter,
  auth: authRouter,
  mission: missionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
