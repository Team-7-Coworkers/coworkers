'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroupsTaskListTasks } from '@/app/api/task.api';
import { TaskListResponseType } from '@/app/types/taskList';
import { useTaskStore } from '@/app/stores/taskStore';
import ItemList from './ItemList';
import styles from './ListCategory.module.css';

type ListCategoryProps = {
  selectedDate: Date;
  taskLists: TaskListResponseType['getGroupsTaskLists'][];
  groupId: number;
  onCategoryChange: (taskListId: number) => void;
  onTaskClick: (taskId: number) => void;
};

export default function ListCategory({
  selectedDate,
  taskLists,
  groupId,
  onCategoryChange,
  onTaskClick,
}: ListCategoryProps) {
  const { selectedCategory, setSelectedCategory, setTasks, setCheckedItems } =
    useTaskStore();

  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}T00:00:00Z`;

  const { data: taskData } = useQuery({
    queryKey: ['tasks', groupId, selectedCategory, formattedDate],
    queryFn: async () => {
      if (!selectedCategory) return [];
      return await getGroupsTaskListTasks({
        groupId,
        taskListId: selectedCategory,
        date: formattedDate,
      });
    },
    enabled: !!selectedCategory,
  });

  useEffect(() => {
    if (taskLists.length > 0 && selectedCategory === null) {
      setSelectedCategory(taskLists[0].id);
      onCategoryChange(taskLists[0].id);
    }
  }, [taskLists, selectedCategory, setSelectedCategory, onCategoryChange]);

  useEffect(() => {
    if (selectedCategory !== null && buttonRefs.current[selectedCategory]) {
      buttonRefs.current[selectedCategory]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedCategory, taskLists]);

  useEffect(() => {
    if (taskData) {
      setTasks(selectedCategory ?? 0, taskData);
      const initialCheckedItems: { [key: number]: boolean } = {};
      taskData.forEach((task) => {
        initialCheckedItems[task.id] = !!task.doneAt;
      });
      setCheckedItems(initialCheckedItems);
    }
  }, [taskData, setTasks, selectedCategory, setCheckedItems]);

  if (taskLists.length === 0) {
    return (
      <p className="flex h-[50vh] items-center justify-center text-center text-md font-medium text-t-default">
        아직 할 일 목록이 없습니다. <br /> 새로운 목록을 추가해주세요.
      </p>
    );
  }

  return (
    <div>
      <div
        ref={listRef}
        className={`flex w-full space-x-5 whitespace-nowrap pb-2 text-lg font-medium ${styles.ListScrollbar}`}
      >
        {taskLists.map((taskList) => (
          <button
            key={taskList.id}
            ref={(el) => {
              if (el) buttonRefs.current[taskList.id] = el;
            }}
            onClick={() => {
              setSelectedCategory(taskList.id);
              onCategoryChange(taskList.id);
            }}
            className={`pb-2 ${
              selectedCategory === taskList.id
                ? 'rounded-sm border-b-2 border-white text-white'
                : 'text-t-default'
            }`}
            aria-label={`카테고리 선택: ${taskList.name}`}
          >
            {taskList.name}
          </button>
        ))}
      </div>

      <ItemList
        taskListId={selectedCategory || 0}
        selectedDate={formattedDate}
        groupId={groupId}
        onTaskClick={onTaskClick}
      />
    </div>
  );
}
