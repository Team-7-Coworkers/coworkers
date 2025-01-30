import Image from 'next/image';
import Checkbox from './Checkbox';
import dayjs from 'dayjs';
import Dropdown from '@/app/components/Dropdown';
import { useState } from 'react';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import { TaskType } from '@/app/types/shared';

type ItemListProps = {
  items: TaskType[];
  checkedItems: { [key: number]: boolean };
  onCheckboxChange: (id: number, checked: boolean) => void;
  onEditItem: (taskId: number, name: string, description: string) => void;
  onDeleteItem: (taskId: number) => void;
};

const frequencyMap: { [key: string]: string } = {
  ONCE: '한 번',
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};

const getFormattedFrequency = (frequency: string): string => {
  return frequencyMap[frequency] || '알 수 없음';
};

export default function ItemList({
  items,
  checkedItems,
  onCheckboxChange,
  onEditItem,
  onDeleteItem,
}: ItemListProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TaskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedItem) onDeleteItem(selectedItem.id);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (title: string, description: string) => {
    if (selectedItem) onEditItem(selectedItem.id, title, description);
  };

  return (
    <div className="mt-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="mb-4 flex flex-col items-start rounded-lg bg-b-secondary px-3 py-[14px] text-white shadow-md"
        >
          <div className="relative flex w-full items-center justify-between">
            <div className="flex items-center justify-center">
              <Checkbox
                id={item.id}
                checked={!!checkedItems[item.id]}
                onChange={(id, checked) => onCheckboxChange(id, checked)}
                aria-label={`Mark "${item.name}" as completed`}
              />
              <h3
                className={`ml-3 max-w-48 cursor-pointer truncate text-t-primary sm:max-w-full ${
                  checkedItems[item.id] ? 'line-through' : ''
                }`}
              >
                {item.name}
              </h3>
              <div className="absolute right-6 flex items-center gap-1 text-t-default sm:relative sm:right-0 sm:ml-3">
                <Image
                  src="/images/icons/ic_comment.svg"
                  alt="댓글"
                  width={16}
                  height={16}
                />
                {item.commentCount}
              </div>
            </div>
            <Dropdown className="relative">
              <Dropdown.Button>
                <Image
                  src="/images/icons/ic_kebab.svg"
                  alt="수정,삭제"
                  width={16}
                  height={16}
                  className="cursor-pointer rounded-full hover:bg-b-primary"
                />
              </Dropdown.Button>
              <Dropdown.Menu
                animationType="scale"
                className="-right-3"
              >
                <Dropdown.MenuItem onClick={() => openEditModal(item)}>
                  수정하기
                </Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => openDeleteModal(item)}>
                  삭제하기
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/ic_calendar.svg"
                alt="달력"
                width={16}
                height={16}
              />
              <p className="text-sm text-t-default">
                {dayjs(item.date).format('YYYY년 MM월 DD일')}
              </p>
            </div>
            <div className="text-xs text-b-tertiary">|</div>
            <div className="flex items-center gap-2">
              {getFormattedFrequency(item.frequency) !== '한 번' && (
                <Image
                  src="/images/icons/ic_repeat.svg"
                  alt="반복"
                  width={16}
                  height={16}
                />
              )}
              <p className="text-sm text-t-default">
                {getFormattedFrequency(item.frequency)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {selectedItem && (
        <>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedItem.name}
          />
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={handleEdit}
            initialTitle={selectedItem.name}
            initialDescription=""
          />
        </>
      )}
    </div>
  );
}
