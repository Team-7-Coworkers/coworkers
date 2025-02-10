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
import Loading from '@/app/components/Loading';
import {
  patchGroupsTaskListsTasks,
  patchGroupsTaskListTasksOrder,
} from '@/app/api/task.api';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { useQueryClient } from '@tanstack/react-query';

type ItemListProps = {
  items: TaskType[] | undefined;
  groupId: number;
  taskListId: number;
  isLoading: boolean;
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
  const queryClient = useQueryClient();
  const [isReordering, setIsReordering] = useState(false);

  const tasks = useTaskStore((state) => state.tasks);
  const { checkedItems, setTasks, toggleChecked, updateTask } = useTaskStore();

  // 할 일 순서 변경
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !items) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    // 순서 변경없이 할 일을 들었다 놓을 때를 감안
    if (sourceIndex === destinationIndex) return;

    const previousTasks = [...items];

    const updatedTasks = [...items];
    const [movedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedItem);
    setTasks(updatedTasks);
    setIsReordering(true);

    const params = {
      groupId,
      taskListId,
      taskId: movedItem.id,
      displayIndex: result.destination.index,
    };
    // 순서 변경
    try {
      await patchGroupsTaskListTasksOrder(params);

      queryClient.invalidateQueries({ queryKey: ['tasks', taskListId] });
    } catch (error) {
      console.error('순서 변경 실패:', error);

      setTasks(previousTasks);
    } finally {
      setTimeout(() => setIsReordering(false), 300);
    }
  };

  const handleComplete = async (taskId: number, checked: boolean) => {
    try {
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId,
        name: tasks[taskId].name,
        description: tasks[taskId].description,
        done: checked,
      });

      toggleChecked(taskId, checked);
    } catch (error) {
      console.error('완료 처리 실패:', error);
      alert('완료 처리에 실패했습니다.');
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
      await onDeleteItem(selectedItem.id);
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

  if (isLoading || isReordering || items === undefined) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="mt-24 text-center text-t-default">
        아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6"
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-4 flex flex-col items-start rounded-lg bg-b-secondary px-3 py-[14px] text-white shadow-md ${
                      snapshot.isDragging ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="relative flex w-full items-center justify-between">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          id={item.id}
                          checked={!!checkedItems[item.id]}
                          onChange={(id, checked) =>
                            handleComplete(id, checked)
                          }
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
    </DragDropContext>
  );
}
