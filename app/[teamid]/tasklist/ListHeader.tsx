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
  onListAdded: (newTaskListId: number) => void;
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
      <div className="flex items-center justify-between">
        <h1 className="mb-7 mt-8 flex items-center gap-2 text-2lg font-bold text-t-primary sm:text-xl">
          <span className="max-w-[150px] truncate bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent sm:max-w-[450px] lg:max-w-full">
            {groupName}
          </span>
          할 일
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
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
        <ListDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <p
          className="mt-1 cursor-pointer text-md text-primary hover:text-i-hover sm:ml-5 sm:mt-0"
          onClick={() => setIsModalOpen(true)}
        >
          + 새로운 목록 추가하기
        </p>
      </div>
      <AddListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        groupId={groupId}
        onListAdded={onListAdded}
      />
    </div>
  );
}
