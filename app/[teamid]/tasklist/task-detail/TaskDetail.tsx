'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TaskType } from '@/app/types/shared';
import {
  deleteGroupsTaskListsTasks,
  getGroupsTaskListsTasks,
  patchGroupsTaskListsTasks,
} from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';
import { createErrorHandler } from '@utils/createErrorHandler';
import Loading from '@/app/components/Loading';
import DeleteModal from '../modals/DeleteModal';
import EditModal from '../modals/EditModal';
import TaskDetailHeader from './TaskDetailHeader';
import TaskComment from './TaskComment';
import CheckButton from './CheckButton';

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
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { checkedItems, setCheckedItems, deleteTask } = useTaskStore();

  const isCompleted = checkedItems[taskId] || false;

  const { data: task, isLoading } = useQuery<TaskType>({
    queryKey: ['taskDetail', groupId, taskListId, taskId],
    queryFn: async () => {
      const response = await getGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId,
      });
      setCheckedItems((prev) => ({
        ...prev,
        [taskId]: !!response.doneAt,
      }));
      return response;
    },
    enabled: !!taskId,
  });

  const editMutation = useMutation<
    void,
    unknown,
    { title: string; description: string }
  >({
    mutationFn: async ({ title, description }) => {
      if (!task) return;
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId,
        name: title,
        description,
        done: isCompleted,
      });
    },
    onSuccess: (_, variables) => {
      toast.success('할 일이 수정되었습니다.');

      queryClient.setQueryData(
        ['taskDetail', groupId, taskListId, taskId],
        (prev: TaskType | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            name: variables.title,
            description: variables.description,
          };
        }
      );

      queryClient.setQueryData(
        ['tasks', groupId, taskListId],
        (oldData: TaskType[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  name: variables.title,
                  description: variables.description,
                }
              : t
          );
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });

      setIsEditModalOpen(false);
    },
    onError: createErrorHandler({ prefixMessage: '할 일 수정 실패' }),
  });

  const handleEdit = (title: string, description: string) => {
    editMutation.mutate({ title, description });
  };

  const deleteMutation = useMutation<void, unknown, void>({
    mutationFn: async () => {
      if (!task) return;
      await deleteGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId: task.id,
      });
    },
    onSuccess: () => {
      toast.success('할 일이 삭제되었습니다.');

      queryClient.removeQueries({
        queryKey: ['taskDetail', groupId, taskListId, taskId],
      });

      queryClient.setQueryData(
        ['tasks', groupId, taskListId],
        (oldData: TaskType[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.filter((t) => t.id !== taskId);
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, taskListId],
      });

      deleteTask(taskListId, taskId);
      setIsDeleteModalOpen(false);
      onClose();
    },
    onError: createErrorHandler({ prefixMessage: '할 일 삭제 실패' }),
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      {task ? (
        <>
          <TaskDetailHeader
            task={task}
            isCompleted={isCompleted}
            onEdit={() => setIsEditModalOpen(true)}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
          <p className="mt-5 min-h-[20vh] whitespace-normal break-words text-md text-t-primary">
            {task.description}
          </p>
          <TaskComment
            taskListId={taskListId}
            taskId={taskId}
          />
          <CheckButton
            taskId={taskId}
            groupId={groupId}
            taskListId={taskListId}
          />
          {isEditModalOpen && (
            <EditModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onConfirm={handleEdit}
              initialTitle={task.name}
              initialDescription={task.description}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDelete}
              itemName={task.name}
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
