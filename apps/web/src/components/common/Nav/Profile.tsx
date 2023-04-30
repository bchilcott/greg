import { Fragment } from 'react';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import {
  HiOutlineChevronDown,
  HiOutlineCog,
  HiOutlineUser,
} from 'react-icons/hi';
import { HiPower } from 'react-icons/hi2';

import { api } from '~/utils/trpc';

export default function Profile() {
  const { data: session } = api.auth.getSession.useQuery();

  const profilePic = session?.user.image;

  return (
    <Menu>
      <Menu.Button className="flex items-center space-x-3">
        <HiOutlineChevronDown
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <Image
          className="h-14 w-14 rounded-full"
          src={profilePic ?? '/default-profile.png'}
          alt={`${session?.user.name} profile photo.`}
          width="60"
          height="60"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute right-4 top-16 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              <HiOutlineUser className="mr-4 text-lg" />
              Profile
            </MenuItem>
            <MenuItem>
              <HiOutlineCog className="mr-4 text-lg" />
              Settings
            </MenuItem>
            <MenuItem onClick={() => void signOut({ callbackUrl: '/' })}>
              <HiPower className="mr-4 text-lg text-red-500" />
              Sign Out
            </MenuItem>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

type MenuItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function MenuItem(props: MenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-blue-600 text-white' : 'text-gray-200'
          } group flex w-full items-center px-2 py-2 text-sm`}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </Menu.Item>
  );
}
