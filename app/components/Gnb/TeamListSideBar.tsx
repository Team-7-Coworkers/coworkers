'use client';

import { GroupType } from '@/app/types/shared';
import CloseIcon from '../Modal/CloseIcon';
import Link from 'next/link';

interface TeamListSideBarProps {
  teamList: GroupType[];
  isOpen: boolean;
  currentTeamId?: number;
  onClose: () => void;
  currentPath: string;
}

export default function TeamListSideBar({
  teamList,
  onClose,
  currentTeamId,
  isOpen,
  currentPath,
}: TeamListSideBarProps) {
  return (
    <nav
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 w-52 space-y-10 p-4 sm:hidden`}
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="space-y-5 text-md font-medium">
        {teamList.map((team) => (
          <Link
            key={team.id}
            href={`/${team.id}`}
            onClick={onClose}
            className={`flex min-h-5 w-full text-start ${team.id === currentTeamId ? 'rounded-lg bg-b-primary px-1 py-1.5 text-gray-200' : 'hover:text-green-600'}`}
          >
            <p>{team.id === currentTeamId ? '▸ ' : ''}</p>
            <p className="break-all px-1">{team.name}</p>
          </Link>
        ))}
        <div className="border-t-[1px] border-t-slate-600" />
        <Link
          href="/boards"
          className={`flex gap-1 font-bold ${currentPath.includes('/boards') ? 'rounded-lg bg-b-primary px-1 py-1.5 text-gray-200' : 'hover:text-green-600'}}`}
          onClick={onClose}
        >
          <p>{currentPath.includes('/boards') ? '▸ ' : ''}</p>
          <p
            className={`${currentPath.includes('/boards') ? '' : 'hover:text-green-600'}`}
          >
            자유게시판
          </p>
        </Link>
        <Link
          className="block rounded-xl border-[1px] border-slate-50 py-3 text-center text-md font-medium transition-all hover:scale-95 hover:bg-b-tertiary"
          href="/addteam"
          onClick={onClose}
        >
          + 팀 생성하기
        </Link>
      </div>
    </nav>
  );
}
