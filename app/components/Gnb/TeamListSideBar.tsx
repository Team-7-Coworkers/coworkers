'use client';

import { GroupType } from '@/app/types/shared';
import CloseIcon from '../Modal/CloseIcon';
import Link from 'next/link';

interface TeamListSideBarProps {
  teamList: GroupType[];
  isOpen: boolean;
  currentTeamId?: number;
  onClose: () => void;
}

export default function TeamListSideBar({
  teamList,
  onClose,
  currentTeamId,
  isOpen,
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
            className={`translat block min-h-5 w-full text-start transition-all duration-75 hover:scale-105 ${team.id === currentTeamId ? 'scale-105 rounded-lg bg-b-primary px-1 py-1.5 text-gray-200' : 'hover:text-green-500'}`}
          >
            {team.id === currentTeamId ? '▸ ' : ''}
            {team.name}
          </Link>
        ))}
        <Link
          href="/boards"
          className="block font-bold text-primary transition-all duration-75 hover:scale-105"
          onClick={onClose}
        >
          자유게시판
        </Link>
      </div>
    </nav>
  );
}
