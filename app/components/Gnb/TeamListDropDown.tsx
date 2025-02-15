'use client';

import Image from 'next/image';
import Link from 'next/link';

import { GroupType } from '@app/types/shared';
import TeamListDropDownItem from '@components/Gnb/TeamListDropDownItem';
import Dropdown from '@components/Dropdown';

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
      <Dropdown.Button className="flex items-center gap-1">
        <p className="text-md sm:max-w-[160px] sm:truncate lg:text-lg">
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
          .sort((a, b) => b.id - a.id)
          .map((team) => {
            return (
              <Dropdown.MenuItem
                className="px-[0px] pb-[0] pt-[0]"
                key={team.id}
              >
                <Link
                  href={`/${team.id}`}
                  className="block px-[12px] pb-[8px] pt-[8px]"
                >
                  <TeamListDropDownItem team={team} />
                </Link>
              </Dropdown.MenuItem>
            );
          })}
        <Dropdown.MenuItem className="flex justify-center px-0 pb-0 hover:bg-transparent">
          <Link
            className="block w-[186px] rounded-xl border-[1px] border-slate-50 py-3.5 text-center text-lg font-medium transition-all hover:scale-95 hover:opacity-70"
            href="/addteam"
          >
            + 팀 생성하기
          </Link>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
