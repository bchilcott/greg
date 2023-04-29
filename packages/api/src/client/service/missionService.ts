import { prisma, type GuildMember, type Mission } from '@greg/db';

export async function createEmptyMission(
  missionName: string,
  guildMember: GuildMember
): Promise<Mission | null> {
  const mission = await prisma.mission.create({
    data: {
      name: missionName,
      guild: {
        connect: {
          id: guildMember.guildId,
        },
      },
      creator: {
        connect: {
          id: guildMember.id,
        },
      },
      participants: {
        create: {
          guildMember: {
            connect: {
              id: guildMember.id,
            },
          },
        },
      },
    },
  });

  return mission;
}
