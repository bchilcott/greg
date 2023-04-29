import type { Guild } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../server';
import { createGuild } from '../service/guildService';
import { getUserByDiscordId } from '../service/userService';
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
      const user = await getUserByDiscordId(input.userDiscordId);

      if (!user) {
        return {
          guild: null,
          error: createError(404, 'User not found'),
        };
      }

      const existing = await ctx.prisma.guild.findFirst({
        where: { discordId: input.guildDiscordId },
      });

      if (existing) {
        return {
          guild: null,
          error: createError(409, 'Guild already exists'),
        };
      }

      try {
        const guild = await createGuild(input.guildDiscordId, user.id);
        return { guild, error: null };
      } catch (err) {
        return {
          guild: null,
          error: createError(500, 'Failed to create guild'),
        };
      }
    }),
});
