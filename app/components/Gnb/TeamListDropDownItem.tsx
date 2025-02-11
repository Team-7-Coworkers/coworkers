import { GroupType } from '@/app/types/shared';
import Img from '../Img';

interface TeamListDropDownItemProps {
  team: GroupType;
}

export default function TeamListDropDownItem({
  team,
}: TeamListDropDownItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-md">
        <Img
          src={team.image || ''}
          baseImage="/images/icons/ic_team.svg"
          alt="팀 이미지"
          fill
          className="object-cover"
        />
      </div>
      <p className="truncate text-lg">{team.name}</p>
    </div>
  );
}
