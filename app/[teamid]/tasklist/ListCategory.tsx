'use client';

import React, { useState, useEffect } from 'react';
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
  doneAt?: string | null;
}

interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
}

type ListCategoryProps = {
  selectedDate: Date;
  taskLists: TaskList[];
  groupId: number;
  updateTrigger: boolean;
  onCategoryChange: (taskListId: number) => void;
};

export default function ListCategory({
  selectedDate,
  taskLists,
  groupId,
  updateTrigger,
  onCategoryChange,
}: ListCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<TaskList | null>(
    taskLists.length > 0 ? taskLists[0] : null
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    if (taskLists.length > 0 && !selectedCategory) {
      const firstCategory = taskLists[0];
      setSelectedCategory(firstCategory);
      onCategoryChange(firstCategory.id);
    }
  }, [taskLists, selectedCategory, onCategoryChange]);

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      if (!selectedCategory) return;

      try {
        const formattedDate = `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(
          2,
          '0'
        )}T00:00:00Z`;

        const response = await instance.get<Task[]>(
          `/groups/${groupId}/task-lists/${selectedCategory.id}/tasks`,
          {
            params: { date: formattedDate },
          }
        );
        setTasks(response.data);
        const initialCheckedItems = response.data.reduce(
          (acc: { [key: number]: boolean }, task) => {
            acc[task.id] = !!task.doneAt || false;
            return acc;
          },
          {}
        );
        setCheckedItems(initialCheckedItems);
      } catch (err) {
        console.error('Tasks를 불러오는 중 오류가 발생했습니다:', err);
      }
    };

    fetchTasks();
  }, [selectedCategory, selectedDate, updateTrigger, groupId]);

  const handleCategoryChange = (taskList: TaskList) => {
    if (selectedCategory?.id !== taskList.id) {
      setSelectedCategory(taskList);
      onCategoryChange(taskList.id);
    }
  };

  return (
    <div>
      <div
        className={`flex w-full space-x-5 overflow-x-auto whitespace-nowrap text-lg font-medium ${styles.scrollbarHide}`}
      >
        {taskLists.map((taskList) => (
          <button
            key={taskList.id}
            onClick={() => handleCategoryChange(taskList)}
            className={`pb-2 ${
              selectedCategory?.id === taskList.id
                ? 'rounded-sm border-b-2 border-white text-white'
                : 'text-t-default'
            }`}
            aria-label={`카테고리 선택: ${taskList.name}`}
          >
            {taskList.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ItemList
          items={tasks}
          checkedItems={checkedItems}
          onCheckboxChange={async (id, checked) => {
            if (!selectedCategory) return;

            setCheckedItems((prev) => ({ ...prev, [id]: checked }));

            await instance.patch(
              `/groups/${groupId}/task-lists/${selectedCategory.id}/tasks/${id}`,
              { done: checked }
            );
          }}
        />
      </div>
    </div>
  );
}
