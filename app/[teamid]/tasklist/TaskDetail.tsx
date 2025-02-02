'use client';

import { useEffect, useState } from 'react';
import CheckButton from './CheckButton';
import { TaskType } from '@/app/types/shared';
import {
  deleteGroupsTaskListsTasks,
  getGroupsTaskListsTasks,
  patchGroupsTaskListsTasks,
} from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';
import CheckIcon from './CheckIcon';
import DateDisplay from './InfoDisplay/DateDisplay';
import FrequencyDisplay from './InfoDisplay/FrequencyDisplay';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import KebobDropdown from './KebobDropdown';

interface TaskDetailProps {
  taskId: number;
  groupId: number;
  taskListId: number;
  onClose: () => void;
}

export default function TaskDetail({
  taskId,
  groupId,
  taskListId,
  onClose,
}: TaskDetailProps) {
  const [task, setTask] = useState<TaskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { checkedItems, setCheckedItems, updateTask, deleteTask } =
    useTaskStore();
  const isCompleted = checkedItems[taskId];

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId,
        });
        setTask(response);

        setCheckedItems((prev) => {
          if (prev[taskId] === undefined) {
            return {
              ...prev,
              [taskId]: !!response.doneAt,
            };
          }
          return prev;
        });

        updateTask(taskId, response.name, response.description);
      } catch (error) {
        console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchTask();
  }, [taskId, groupId, taskListId, setCheckedItems, updateTask]);

  const handleEdit = async (title: string, description: string) => {
    if (task) {
      try {
        await patchGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId,
          name: title,
          description,
          done: !!task.doneAt,
        });

        setTask((prevTask) =>
          prevTask ? { ...prevTask, name: title, description } : prevTask
        );
        updateTask(taskId, title, description);
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('수정 중 오류 발생:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (task) {
      try {
        await deleteGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId,
        });

        deleteTask(taskId);
        setIsDeleteModalOpen(false);
        onClose();
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className="text-white">
      {task ? (
        <>
          {isCompleted && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-tertiary">
              <CheckIcon
                classname="w-4 h-4"
                color="#a3e635"
              />
              완료
            </div>
          )}
          <div className="flex items-center justify-between">
            <h2
              className={`mt-2 text-2lg font-bold sm:text-xl ${
                isCompleted ? 'line-through' : ''
              }`}
            >
              {task.name}
            </h2>
            <KebobDropdown
              onEdit={() => setIsEditModalOpen(true)}
              onDelete={() => setIsDeleteModalOpen(true)}
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <DateDisplay date={task.date} />
            <div className="text-xs text-b-tertiary">|</div>
            <FrequencyDisplay frequency={task.frequency} />
          </div>

          <p className="mt-5">{task.description}</p>

          <CheckButton
            taskId={taskId}
            groupId={groupId}
            taskListId={taskListId}
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onConfirm={handleEdit}
            initialTitle={task.name}
            initialDescription={task.description}
          />

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={task.name}
          />
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}
