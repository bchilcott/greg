import { prisma, type User } from '@greg/db';

export async function getUserByDiscordId(id: string): Promise<User | null> {
  const res = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        providerAccountId: id,
        provider: 'discord',
      },
    },
    select: { user: true },
  });

  if (!res || !res.user) return null;
  return res.user;
}
