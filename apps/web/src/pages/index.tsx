import Image from 'next/image';

import DiscordSignIn from '~/components/index/DiscordSignIn';
import Examples from '~/components/index/Examples';

import eye from '~/assets/eye.svg';

export default function Home() {
  return (
    <>
      <div className="bg-home-body flex h-screen w-full flex-col">
        <div className="overflow-y-hidden p-8 xl:pl-24 xl:pt-24">
          <div className="mb-8">
            <span className="flex items-center">
              <Image src={eye as string} alt="eye" className="mb-2 mr-4 w-28" />
              <h1 className="mb-2 text-8xl font-thin">GREG</h1>
            </span>
            <p className="text-md text-2xl text-gray-300">
              Arma 3 operation management for Discord
            </p>
          </div>
          <Examples />
          <div className="absolute bottom-0 left-0 right-0 h-5/6 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        </div>

        <div className="clip-home-login absolute right-0 hidden min-h-full w-3/5 max-w-7xl items-center justify-center bg-gradient-to-bl from-gray-900 to-gray-950 xl:flex">
          <div className="w-2/6" />
          <div>
            <h1 className="mb-4 text-5xl font-light">Get started...</h1>
            <DiscordSignIn />
          </div>
        </div>
      </div>
    </>
  );
}
