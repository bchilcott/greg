import type { Guild } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../server';
import { createError, type APIError } from '../util/errors';

type CreateGuildResponse = Promise<
  | {
      guild: Guild;
      error: null;
    }
  | {
      guild: null;
      error: APIError;
    }
>;

export const guildRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guild.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        guildDiscordId: z.string(),
        userDiscordId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): CreateGuildResponse => {
      const account = await ctx.prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            providerAccountId: input.userDiscordId,
            provider: 'discord',
          },
        },
        select: { user: true },
      });

      if (!account) {
        return {
          guild: null,
          error: createError(404, 'User not found'),
        };
      }

      const guild = await ctx.prisma.guild.upsert({
        where: { discordId: input.guildDiscordId },
        create: {
          discordId: input.guildDiscordId,
          members: {
            create: {
              user: {
                connect: {
                  id: account.user.id,
                },
              },
              isOwner: true,
            },
          },
        },
        update: {},
      });

      return { guild, error: null };
    }),
});
