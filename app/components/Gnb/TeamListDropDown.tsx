'use client';

import { GroupType } from '@/app/types/shared';
import TeamListDropDownItem from './TeamListDropDownItem';
import Dropdown from '../Dropdown';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TeamListDropDownProps {
  teamList: GroupType[];
  currentTeam?: GroupType;
}

export default function TeamListDropDown({
  teamList,
  currentTeam,
}: TeamListDropDownProps) {
  const router = useRouter();

  const handleClick = (teamId: number) => {
    router.push(`/${teamId}`);
  };

  return (
    <Dropdown>
      <Dropdown.Button className="flex items-center gap-2">
        {currentTeam?.name || '팀 목록'}
        <Image
          src="/images/icons/ic_dropdown-check.svg"
          alt=""
          width={16}
          height={16}
        />
      </Dropdown.Button>

      <Dropdown.Menu
        animationType="scale"
        className="top-[52px] z-30 w-[218px] p-[8px] pb-4 sm:-left-[144px] lg:-left-[200px]"
      >
        {teamList.map((team) => {
          return (
            <Dropdown.MenuItem
              key={team.id}
              onClick={() => handleClick(team.id)}
              className="pb-[8px] pt-2"
            >
              <TeamListDropDownItem team={team} />
            </Dropdown.MenuItem>
          );
        })}
        <button
          className="mx-auto mt-4 block w-[186px] rounded-xl border-[1px] border-slate-50 py-3.5 text-lg font-medium transition-all hover:scale-95 hover:opacity-70"
          onClick={() => router.push('/addteam')}
        >
          + 팀 추가하기
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
