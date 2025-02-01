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
      <Image
        src={team.image || '/images/icons/ic_user.svg'}
        width={32}
        height={32}
        alt=""
      />
      <p className="truncate text-lg">{team.name}</p>
    </div>
  );
}
