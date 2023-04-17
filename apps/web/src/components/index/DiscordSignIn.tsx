import { api } from "~/utils/trpc";
import { signIn, signOut } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function DiscordSignIn() {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <button
      className="mx-auto flex space-x-4 rounded-md bg-[#5468FF] px-4 py-2 font-normal"
      onClick={
        session
          ? () => void signOut()
          : () => void signIn("discord", { callbackUrl: "/" })
      }
    >
      <span className="flex items-center gap-2">
        <FaDiscord className="text-xl" />
        {session ? "Sign out" : "Sign in with Discord"}
      </span>
    </button>
  );
}
