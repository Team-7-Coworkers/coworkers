'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import ItemList from './ItemList';
import styles from './ListCategory.module.css';
import {
  getGroupsTaskListTasks,
  deleteGroupsTaskListsTasks,
  patchGroupsTaskListsTasks,
} from '@/app/api/task.api';
import { TaskListResponseType } from '@/app/types/taskList';
import { useTaskStore } from '@/app/stores/taskStore';

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
  const {
    selectedCategory,
    setSelectedCategory,
    setTasks,
    checkedItems,
    setCheckedItems,
    deleteTask,
    tasks,
  } = useTaskStore();

  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(
    2,
    '0'
  )}-${String(selectedDate.getDate()).padStart(2, '0')}T00:00:00Z`;

  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks', groupId, selectedCategory, formattedDate],
    queryFn: async () => {
      if (!selectedCategory) return [];

      return await getGroupsTaskListTasks({
        groupId,
        taskListId: selectedCategory,
        date: formattedDate,
      });
    },
  });

  useEffect(() => {
    // 카테고리 선택
    if (taskLists.length > 0 && selectedCategory === null) {
      setSelectedCategory(taskLists[0].id);
      onCategoryChange(taskLists[0].id);
    }
  }, [taskLists, selectedCategory, setSelectedCategory, onCategoryChange]);

  useEffect(() => {
    // 스크롤 이동
    if (selectedCategory !== null && buttonRefs.current[selectedCategory]) {
      buttonRefs.current[selectedCategory]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    // 체크 상태 관리
    if (taskData) {
      setTasks(selectedCategory ?? 0, taskData);
      const initialCheckedItems: { [key: number]: boolean } = {};
      taskData.forEach((task) => {
        initialCheckedItems[task.id] = !!task.doneAt;
      });
      setCheckedItems(initialCheckedItems);
    }
  }, [taskData, setTasks, selectedCategory, setCheckedItems]);

  const handleCategoryChange = (
    taskList: TaskListResponseType['getGroupsTaskLists']
  ) => {
    if (selectedCategory !== taskList.id) {
      setSelectedCategory(taskList.id);
      onCategoryChange(taskList.id);
    }
  };

  const handleEditItem = async (
    taskId: number,
    name: string,
    description: string
  ) => {
    if (selectedCategory === null) return;
    try {
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId: selectedCategory || 0,
        taskId,
        name,
        description,
        done: !!tasks[selectedCategory]?.[taskId]?.doneAt,
      });
      refetch();
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  const handleDeleteItem = async (taskId: number) => {
    if (selectedCategory === null) return;
    try {
      if (checkedItems[taskId]) {
        await patchGroupsTaskListsTasks({
          groupId,
          taskListId: selectedCategory || 0,
          taskId,
          name: tasks[selectedCategory]?.[taskId].name,
          description: tasks[selectedCategory]?.[taskId].description,
          done: false,
        });
      }

      await deleteGroupsTaskListsTasks({
        groupId,
        taskListId: selectedCategory || 0,
        taskId,
      });

      deleteTask(selectedCategory ?? 0, taskId);
      refetch();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  if (!isLoading && taskLists.length === 0) {
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
            onClick={() => handleCategoryChange(taskList)}
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
        seletedDate={formattedDate}
        groupId={groupId}
        items={taskData ?? []}
        isLoading={isLoading}
        onTaskClick={onTaskClick}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
