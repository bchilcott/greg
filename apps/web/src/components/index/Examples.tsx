import achievements from "~/assets/examples/achievements.png";
import create from "~/assets/examples/create.png";
import manage from "~/assets/examples/manage.png";
import upcoming from "~/assets/examples/upcoming.png";
import xp from "~/assets/examples/xp.png";

import Image from "next/image";

export default function Examples() {
  return (
    <div className="flex w-full space-x-10">
      <div className="flex flex-col space-y-10">
        <Image src={create} alt="create" />
        <Image src={xp} alt="xp" />
        <Image src={manage} alt="manage" />
      </div>
      <div className="flex flex-col space-y-10">
        <Image src={upcoming} alt="upcoming" />
        <Image src={achievements} alt="achievements" />
      </div>
    </div>
  );
}
