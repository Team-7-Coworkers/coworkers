'use client';

import { GroupType } from '@/app/types/shared';
import TeamListDropDownItem from './TeamListDropDownItem';
import Dropdown from '../Dropdown';
import Image from 'next/image';
import Link from 'next/link';

interface TeamListDropDownProps {
  teamList: GroupType[];
  currentTeam?: GroupType;
}

export default function TeamListDropDown({
  teamList,
  currentTeam,
}: TeamListDropDownProps) {
  return (
    <Dropdown>
      <Dropdown.Button className="flex items-center gap-2">
        <p className="sm:max-w-[206px] sm:truncate lg:max-w-full">
          {currentTeam?.name || '팀 목록'}
        </p>
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
        {[...teamList]
          .sort((a, b) => b.id - a.id) // id순 내림차순 정렬
          .map((team) => {
            return (
              <Dropdown.MenuItem
                className="pb-[8px] pt-[8px]"
                key={team.id}
              >
                <Link href={`/${team.id}`}>
                  <TeamListDropDownItem team={team} />
                </Link>
              </Dropdown.MenuItem>
            );
          })}
        <Link
          className="mx-auto mt-4 block w-[186px] rounded-xl border-[1px] border-slate-50 py-3.5 text-center text-lg font-medium transition-all hover:scale-95 hover:opacity-70"
          href="/addteam"
        >
          + 팀 추가하기
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}
