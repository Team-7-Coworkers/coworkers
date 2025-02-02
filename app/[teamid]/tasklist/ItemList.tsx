'use client';

import Image from 'next/image';
import Checkbox from './Checkbox';
import { useState } from 'react';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import { TaskType } from '@/app/types/shared';
import { useTaskStore } from '@/app/stores/taskStore';
import FrequencyDisplay from './info-displays/FrequencyDisplay';
import KebobDropdown from './KebobDropdown';
import DateDisplay from './info-displays/DateDisplay';

type ItemListProps = {
  items: TaskType[];
  onEditItem: (taskId: number, name: string, description: string) => void;
  onDeleteItem: (taskId: number) => void;
  onTaskClick: (taskId: number) => void;
};

export default function ItemList({
  items,
  onEditItem,
  onDeleteItem,
  onTaskClick,
}: ItemListProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TaskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { checkedItems, toggleChecked, updateTask, deleteTask } =
    useTaskStore();

  const openDeleteModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedItem) {
      onDeleteItem(selectedItem.id);
      deleteTask(selectedItem.id);
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleEdit = (title: string, description: string) => {
    if (selectedItem) {
      onEditItem(selectedItem.id, title, description);
      updateTask(selectedItem.id, title, description);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="mt-6">
      {items.map((item) => (
        <div
          key={`${item.id}-${item.date}`}
          className="mb-4 flex flex-col items-start rounded-lg bg-b-secondary px-3 py-[14px] text-white shadow-md"
        >
          <div className="relative flex w-full items-center justify-between">
            <div className="flex items-center justify-center">
              <Checkbox
                id={item.id}
                checked={!!checkedItems[item.id]}
                onChange={() => toggleChecked(item.id, !checkedItems[item.id])}
                aria-label={`Mark "${item.name}" as completed`}
              />
              <h3
                onClick={() => onTaskClick(item.id)}
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
            <KebobDropdown
              onEdit={() => openEditModal(item)}
              onDelete={() => openDeleteModal(item)}
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <DateDisplay date={item.date} />
            <div className="text-xs text-b-tertiary">|</div>
            <FrequencyDisplay frequency={item.frequency} />
          </div>
        </div>
      ))}
      {selectedItem && (
        <>
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedItem(null);
            }}
            onConfirm={handleDelete}
            itemName={selectedItem.name}
          />
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedItem(null);
            }}
            onConfirm={handleEdit}
            initialTitle={selectedItem.name}
            initialDescription={selectedItem.description}
          />
        </>
      )}
    </div>
  );
}
