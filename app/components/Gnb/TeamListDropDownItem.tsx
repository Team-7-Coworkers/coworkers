import { GroupType } from '@/app/types/shared';
import Image from 'next/image';

interface TeamListDropDownItemProps {
  team: GroupType;
}

export default function TeamListDropDownItem({
  team,
}: TeamListDropDownItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 overflow-hidden rounded-md">
        <Image
          src={team.image || '/images/icons/ic_team.svg'}
          alt=""
          fill
          objectFit="cover"
        />
      </div>
      <p className="truncate text-lg">{team.name}</p>
    </div>
  );
}
