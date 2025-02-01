'use client';

import { GroupType } from '@/app/types/shared';
import CloseIcon from '../Modal/CloseIcon';
import { redirect } from 'next/navigation';

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
  const handleTeamClick = (teamId: number) => {
    onClose();
    redirect(`/${teamId}`);
  };

  const handleBoardsClick = () => {
    onClose();
    redirect('/boards');
  };

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
          <button
            key={team.id}
            onClick={() => handleTeamClick(team.id)}
            className="translat block min-h-5 w-fit transition-all duration-75 hover:scale-105 hover:text-green-500"
          >
            {team.name}
          </button>
        ))}
        <button
          className="font-medium text-primary transition-all hover:text-lg"
          onClick={handleBoardsClick}
        >
          자유게시판
        </button>
      </div>
    </nav>
  );
}
