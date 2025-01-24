'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import instance from '../../libs/axios';
import ItemList from './ItemList';
import styles from './ListCategory.module.css';

interface Task {
  id: number;
  category: string;
  name: string;
  commentCount: number;
  date: string;
  frequency: string;
}

interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
}

interface GroupResponse {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members: Array<{
    userId: number;
    groupId: number;
    userName: string;
    userEmail: string;
    userImage: string | null;
    role: string;
  }>;
  taskLists: TaskList[];
}

type ListCategoryProps = {
  selectedDate: Date;
};

export default function ListCategory({ selectedDate }: ListCategoryProps) {
  const { teamid: groupId } = useParams<{ teamid: string }>();
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TaskList | null>(
    null
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await instance.get<GroupResponse>(
          `/groups/${groupId}`
        );
        setTaskLists(response.data.taskLists);
        setSelectedCategory(response.data.taskLists[0] || null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      if (!selectedCategory) return;

      try {
        const formattedDate =
          selectedDate.toISOString().split('T')[0] + 'T00:00:00Z';

        const response = await instance.get<Task[]>(
          `/groups/${selectedCategory.groupId}/task-lists/${selectedCategory.id}/tasks`,
          {
            params: { date: formattedDate },
          }
        );
        setTasks(response.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            err.message || 'Tasks를 불러오는 중 오류가 발생했습니다.'
          );
        } else {
          console.error('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    if (selectedCategory && selectedDate) {
      fetchTasks();
    }
  }, [selectedCategory, selectedDate]);

  const handleCheckboxChange = (id: number): void => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.date.split('T')[0] === selectedDate.toISOString().split('T')[0]
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div
        className={`flex w-full space-x-5 overflow-x-auto whitespace-nowrap text-lg font-medium ${styles.scrollbarHide}`}
      >
        {taskLists.map((taskList) => (
          <button
            key={taskList.id}
            onClick={() => setSelectedCategory(taskList)}
            className={`pb-2 ${
              selectedCategory?.id === taskList.id
                ? 'rounded-sm border-b-2 border-white text-white'
                : 'text-t-default'
            }`}
            aria-label={`Select category ${taskList.name}`}
          >
            {taskList.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ItemList
          items={filteredTasks}
          checkedItems={checkedItems}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
