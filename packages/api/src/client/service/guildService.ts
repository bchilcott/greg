import { prisma, type Guild, type GuildMember } from '@greg/db';

export async function createGuild(
  guildDiscordId: string,
  userId: string
): Promise<Guild> {
  const guild = await prisma.guild.upsert({
    where: { discordId: guildDiscordId },
    create: {
      discordId: userId,
      members: {
        create: {
          user: {
            connect: {
              id: userId,
            },
          },
          isOwner: true,
        },
      },
    },
    update: {},
  });

  return guild;
}

export async function getMemberByDiscordId(
  userDiscordId: string,
  guildDiscordId: string
): Promise<GuildMember | null> {
  const memberQuery = await prisma.guildMember.findFirst({
    where: {
      user: {
        accounts: {
          every: { providerAccountId: userDiscordId, provider: 'discord' },
        },
      },
      guild: {
        discordId: guildDiscordId,
      },
    },
  });

  if (!memberQuery) return null;
  return memberQuery;
}
