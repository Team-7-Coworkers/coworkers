'use client';

import Image from 'next/image';
import Checkbox from './Checkbox';
import { useMemo, useState } from 'react';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import { TaskType } from '@/app/types/shared';
import { useTaskStore } from '@/app/stores/taskStore';
import FrequencyDisplay from './info-displays/FrequencyDisplay';
import KebobDropdown from './KebobDropdown';
import DateDisplay from './info-displays/DateDisplay';
import Loading from '@/app/components/Loading';
import { patchGroupsTaskListsTasks } from '@/app/api/task.api';
import { toast } from 'react-toastify';

type ItemListProps = {
  items: TaskType[] | undefined;
  groupId: number;
  taskListId: number;
  isLoading: boolean;
  seletedDate: string;
  onEditItem: (taskId: number, name: string, description: string) => void;
  onDeleteItem: (taskId: number) => void;
  onTaskClick: (taskId: number) => void;
};

export default function ItemList({
  items,
  groupId,
  taskListId,
  isLoading,
  onEditItem,
  onDeleteItem,
  onTaskClick,
}: ItemListProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TaskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    tasks: rawTasks,
    checkedItems,
    toggleChecked,
    updateTask,
  } = useTaskStore();
  const tasks = useMemo(
    () => rawTasks[taskListId] || {},
    [rawTasks, taskListId]
  );

  const handleComplete = async (taskId: number, checked: boolean) => {
    try {
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId,
        name: tasks[taskId]?.name,
        description: tasks[taskId]?.description,
        done: checked,
      });

      toggleChecked(taskId, checked);
    } catch (error) {
      console.error('완료 처리 실패:', error);
      toast.error('완료 처리에 실패하였습니다.');
    }
  };

  const openDeleteModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (item: TaskType) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        await onDeleteItem(selectedItem.id);

        toast.success(`"${selectedItem.name}" 할 일이 삭제되었습니다.`);

        setIsDeleteModalOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('삭제 실패:', error);
        toast.error('할 일 삭제에 실패하였습니다.');
      }
    }
  };

  const handleEdit = (title: string, description: string) => {
    if (selectedItem) {
      try {
        onEditItem(selectedItem.id, title, description);
        updateTask(taskListId, selectedItem.id, title, description);

        toast.success(`"${title}" 할 일이 수정되었습니다.`);

        setIsEditModalOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('수정 실패:', error);
        toast.error('할 일 수정에 실패하였습니다.');
      }
    }
  };

  if (isLoading || items === undefined) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="flex h-[50vh] items-center justify-center text-center text-t-default">
        아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
      </p>
    );
  }

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
                onChange={(id, checked) => handleComplete(id, checked)}
                aria-label={`Mark "${item.name}" as completed`}
              />
              <h3
                onClick={() => onTaskClick(item.id)}
                className={`hover:text-highlight ml-3 max-w-48 cursor-pointer truncate text-t-primary transition-transform duration-200 ease-in-out hover:scale-105 sm:max-w-full ${
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
                <span>{tasks[item.id]?.commentCount || 0}</span>
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
              setIsEditModalOpen(false);
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
