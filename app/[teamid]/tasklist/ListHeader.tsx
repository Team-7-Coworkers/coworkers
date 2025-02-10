import { useState } from 'react';
import ListDate from './ListDate';
import AddListModal from './modals/AddListModal';
import Link from 'next/link';
import BackIcon from './task-icon/BackIcon';

type ListHeaderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  groupId: number;
  groupName: string;
  onListAdded: () => void;
};

export default function ListHeader({
  selectedDate,
  setSelectedDate,
  groupId,
  onListAdded,
  groupName,
}: ListHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="mb-7 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
          {groupName} 할 일
        </h1>
        <div className="flex items-center justify-between">
          <Link
            href={`/${groupId}`}
            className="flex items-center gap-1 text-md text-primary hover:text-i-hover"
          >
            <BackIcon className="h-5 w-5" />
            <span>팀 페이지로</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <ListDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <p
          className="ml-3 cursor-pointer truncate text-md text-primary hover:text-i-hover sm:ml-5"
          onClick={() => setIsModalOpen(true)}
        >
          + 새로운 목록 추가하기
        </p>
        <AddListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          groupId={groupId}
          onListAdded={onListAdded}
        />
      </div>
    </div>
  );
}
