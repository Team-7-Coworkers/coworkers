'use client';

import { GroupType } from '@/app/types/shared';
import CloseIcon from '../Modal/CloseIcon';
import { redirect } from 'next/navigation';

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
            className={`translat block min-h-5 w-full text-start transition-all duration-75 hover:scale-105 ${team.id === currentTeamId ? 'scale-105 rounded-lg bg-b-primary px-1 py-1 text-gray-200' : 'hover:text-green-500'}`}
          >
            {team.id === currentTeamId ? '▸ ' : ''}
            {team.name}
          </button>
        ))}
        <button
          className="font-bold text-primary transition-all duration-75 hover:scale-105"
          onClick={handleBoardsClick}
        >
          자유게시판
        </button>
      </div>
    </nav>
  );
}
