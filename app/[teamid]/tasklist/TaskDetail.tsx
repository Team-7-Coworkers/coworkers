'use client';

import { useEffect, useState } from 'react';
import CheckButton from './CheckButton';
import { TaskType } from '@/app/types/shared';
import { getGroupsTaskListsTasks } from '@/app/api/task.api';

interface TaskDetailProps {
  taskId: number;
  groupId: number;
  taskListId: number;
}

export default function TaskDetail({
  taskId,
  groupId,
  taskListId,
}: TaskDetailProps) {
  const [task, setTask] = useState<TaskType | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getGroupsTaskListsTasks({
          groupId,
          taskListId,
          taskId,
        });
        setTask(response);
        setIsCompleted(!!response.doneAt);
      } catch (error) {
        console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchTask();
  }, [taskId, groupId, taskListId]);

  const handleToggleComplete = (newStatus: boolean) => {
    setIsCompleted(newStatus);
    setTask((prev) =>
      prev
        ? { ...prev, doneAt: newStatus ? new Date().toISOString() : null }
        : prev
    );
  };

  return (
    <div className="p-4 text-white">
      {task ? (
        <>
          <h2 className="text-2xl font-bold">{task.name}</h2>
          <p className="mt-2">{task.description}</p>

          <CheckButton
            taskId={taskId}
            groupId={groupId}
            taskListId={taskListId}
            isCompleted={isCompleted}
            onToggleComplete={handleToggleComplete}
          />
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}
