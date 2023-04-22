import { signIn, signOut } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

import { api } from '~/utils/trpc';

export default function DiscordSignIn() {
  const { data: session } = api.auth.getSession.useQuery();
  const { data, mutate, isLoading } = api.guild.create.useMutation();

  console.log(data);

  return (
    <>
      <button
        className="mx-auto flex space-x-4 rounded-md bg-[#5468FF] px-4 py-2 font-normal"
        onClick={
          session
            ? () => void signOut()
            : () => void signIn('discord', { callbackUrl: '/' })
        }
      >
        <span className="flex items-center gap-2">
          <FaDiscord className="text-xl" />
          {session ? 'Sign out' : 'Sign in with Discord'}
        </span>
      </button>
      <button
        onClick={() =>
          mutate({
            guildDiscordId: '375271552624623617',
            userDiscordId: '359005676212715523',
          })
        }
        disabled={isLoading}
      >
        {isLoading ? 'loading...' : 'Do thing'}
      </button>
    </>
  );
}
