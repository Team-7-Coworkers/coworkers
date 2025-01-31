'use client';

import { GroupType } from '@/app/types/shared';
import CloseIcon from '../Modal/CloseIcon';

interface TeamListSideBarProps {
  teamList: GroupType[];
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamListSideBar({
  teamList,
  onClose,
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
      <div className="space-y-4 text-md font-medium">
        {teamList.map((team) => (
          <div key={team.id}>{team.name}</div>
        ))}
      </div>
    </nav>
  );
}
