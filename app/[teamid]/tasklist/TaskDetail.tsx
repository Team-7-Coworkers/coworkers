'use client';

import { useEffect, useState } from 'react';
import CheckButton from './CheckButton';
import { TaskType } from '@/app/types/shared';
import { getGroupsTaskListsTasks } from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';
import CheckIcon from './CheckIcon';

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
  const { checkedItems, setCheckedItems } = useTaskStore();
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
      } catch (error) {
        console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchTask();
  }, [taskId, groupId, taskListId, setCheckedItems]);

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
          <h2
            className={`mt-2 text-2lg font-bold sm:text-xl ${
              isCompleted ? 'line-through' : ''
            }`}
          >
            {task.name}
          </h2>
          <p className="mt-2">{task.description}</p>

          <CheckButton
            taskId={taskId}
            groupId={groupId}
            taskListId={taskListId}
          />
        </>
      ) : (
        <p>로딩 중...</p> //임시 로딩
      )}
    </div>
  );
}
