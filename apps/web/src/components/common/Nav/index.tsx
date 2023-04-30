import GuildSelect from '~/components/common/Nav/GuildSelect';
import Profile from '~/components/common/Nav/Profile';

export default function Nav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b-[1px] border-b-gray-700 bg-gray-950 px-6">
      <GuildSelect />
      <Profile />
    </nav>
  );
}
