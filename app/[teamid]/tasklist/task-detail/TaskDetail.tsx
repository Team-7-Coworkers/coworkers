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
import DeleteModal from '../modals/DeleteModal';
import EditModal from '../modals/EditModal';
import TaskDetailHeader from './TaskDetailHeader';
import TaskComment from './TaskComment';
import Loading from '@/app/components/Loading';

interface TaskDetailProps {
  taskId: number;
  groupId: number;
  taskListId: number;
  onClose: () => void;
  onTaskUpdated: () => void;
}

export default function TaskDetail({
  taskId,
  groupId,
  taskListId,
  onClose,
  onTaskUpdated,
}: TaskDetailProps) {
  const [task, setTask] = useState<TaskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const { checkedItems, setCheckedItems, updateTask, deleteTask } =
    useTaskStore();

  const isCompleted = checkedItems[taskId] || false;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId,
        });
        setTask(response);
        setSelectedTask(null);

        setCheckedItems((prev) => ({
          ...prev,
          [taskId]: !!response.doneAt,
        }));

        updateTask(taskId, response.name, response.description);
      } catch (error) {
        console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchTask();
  }, [taskId, groupId, taskListId, setCheckedItems, updateTask]);

  const openEditModal = () => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = async (title: string, description: string) => {
    if (selectedTask) {
      try {
        await patchGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId: selectedTask.id,
          name: title,
          description,
          done: isCompleted,
        });

        setTask((prevTask) =>
          prevTask ? { ...prevTask, name: title, description } : prevTask
        );
        updateTask(selectedTask.id, title, description);
        setIsEditModalOpen(false);
        onTaskUpdated();
      } catch (error) {
        console.error('수정 중 오류 발생:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        await deleteGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId: selectedTask.id,
        });

        deleteTask(selectedTask.id);
        setIsDeleteModalOpen(false);
        onClose();
        onTaskUpdated();
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedTask(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  return (
    <div className="relative min-h-[80vh]">
      {task ? (
        <>
          <TaskDetailHeader
            task={task}
            isCompleted={isCompleted}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          <p className="mt-5 min-h-[20vh] whitespace-normal break-words text-md text-t-primary">
            {task.description}
          </p>
          <TaskComment taskId={taskId} />
          <CheckButton
            onTaskUpdated={onTaskUpdated}
            taskId={taskId}
            groupId={groupId}
            taskListId={taskListId}
          />
          {selectedTask && (
            <EditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onConfirm={handleEdit}
              initialTitle={selectedTask.name}
              initialDescription={selectedTask.description}
            />
          )}
          {selectedTask && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDelete}
              itemName={selectedTask.name}
            />
          )}
        </>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
