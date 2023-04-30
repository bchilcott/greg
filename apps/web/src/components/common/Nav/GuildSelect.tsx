import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const guilds = [
  { name: 'The Gregglezone' },
  { name: 'Blue Team' },
  { name: 'Greggle & Kryuger PMC' },
];

export default function GuildSelect() {
  const [selected, setSelected] = useState<{ name: string }>({
    name: 'The Gregglezone',
  });

  return (
    <div className="top-16 w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full rounded-md py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
            <span className="block truncate text-lg text-gray-200">
              {selected.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {guilds.map((guild, guildIdx) => (
                <Listbox.Option
                  key={guildIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-200 ${
                      active ? 'cursor-pointer bg-blue-600' : ''
                    }`
                  }
                  value={guild}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {guild.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
