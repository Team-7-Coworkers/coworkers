import { useState } from 'react';
import ListDate from './ListDate';
import AddListModal from './modals/AddListModal';

type ListHeaderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  groupId: number;
  onListAdded: () => void;
};

export default function ListHeader({
  selectedDate,
  setSelectedDate,
  groupId,
  onListAdded,
}: ListHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
  );
}
