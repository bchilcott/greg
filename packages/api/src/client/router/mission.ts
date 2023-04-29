import type { Mission } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../server';
import { getMemberByDiscordId } from '../service/guildService';
import { createEmptyMission } from '../service/missionService';
import { createError, type APIError } from '../util/errors';

type CreateMissionResponse = Promise<
  | {
      mission: Mission;
      error: null;
    }
  | {
      mission: null;
      error: APIError;
    }
>;

export const missionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        missionName: z.string(),
        userDiscordId: z.string(),
        guildDiscordId: z.string(),
      })
    )
    .mutation(async ({ input }): CreateMissionResponse => {
      const guildMember = await getMemberByDiscordId(
        input.userDiscordId,
        input.guildDiscordId
      );

      if (!guildMember) {
        return {
          mission: null,
          error: createError(404, 'User not found'),
        };
      }

      const newMission = await createEmptyMission(
        input.missionName,
        guildMember
      );

      if (!newMission) {
        return {
          mission: null,
          error: createError(500, 'Failed to create mission'),
        };
      }

      return { mission: newMission, error: null };
    }),
});
