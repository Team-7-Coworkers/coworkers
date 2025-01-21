'use client';

import { mockTeamList } from './TeamListDropDown';

export default function TeamListSideBar({
  onClose,
  isOpen
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <nav
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 w-52 space-y-10 p-4 sm:hidden`}
    >
      <div
        className="w-full cursor-pointer text-end"
        onClick={onClose}
      >
        X {/*임시*/}
      </div>
      <div className="space-y-4 text-md font-medium">
        {mockTeamList.map((team) => (
          <div key={team.id}>{team.name}</div>
        ))}
      </div>
    </nav>
  );
}
