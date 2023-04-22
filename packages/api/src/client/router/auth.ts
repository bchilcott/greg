import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '../../server';

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @greg/auth package
    return 'you can see this secret message!';
  }),
});
