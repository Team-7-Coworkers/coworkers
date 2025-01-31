import { GroupType } from '@/app/types/shared';
import Image from 'next/image';

interface TeamListDropDownItemProps {
  team: GroupType;
}

export default function TeamListDropDownItem({
  team,
}: TeamListDropDownItemProps) {
  return (
    <div className='flex items-center gap-4'>
      <Image
        src={team.image ||'/images/icons/ic_user.svg'}
        width={32}
        height={32}
        alt=""
      />
      <p className='text-lg truncate'>{team.name}</p>
    </div>
  );
}
