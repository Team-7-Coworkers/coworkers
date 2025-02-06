'use client';

import React, { useState, useEffect } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState<
    TaskListResponseType['getGroupsTaskLists'] | null
  >(null);

  const { setTasks, setCheckedItems, deleteTask, tasks } = useTaskStore();

  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks', selectedCategory?.id, selectedDate],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(
        2,
        '0'
      )}-${String(selectedDate.getDate()).padStart(2, '0')}T00:00:00Z`;

      return await getGroupsTaskListTasks({
        groupId,
        taskListId: selectedCategory.id,
        date: formattedDate,
      });
    },
    enabled: !!selectedCategory,
  });

  useEffect(() => {
    if (taskLists.length > 0 && !selectedCategory) {
      setSelectedCategory(taskLists[0]);
      onCategoryChange(taskLists[0].id);
    }
  }, [taskLists, selectedCategory, onCategoryChange]);

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
      const initialCheckedItems: { [key: number]: boolean } = {};
      taskData.forEach((task) => {
        initialCheckedItems[task.id] = !!task.doneAt;
      });
      setCheckedItems(initialCheckedItems);
    }
  }, [taskData, setTasks, setCheckedItems]);

  const handleCategoryChange = (
    taskList: TaskListResponseType['getGroupsTaskLists']
  ) => {
    if (selectedCategory?.id !== taskList.id) {
      setSelectedCategory(taskList);
      onCategoryChange(taskList.id);
    }
  };

  const handleEditItem = async (
    taskId: number,
    name: string,
    description: string
  ) => {
    try {
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId: selectedCategory?.id || 0,
        taskId,
        name,
        description,
        done: !!tasks[taskId]?.doneAt,
      });
      refetch();
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  const handleDeleteItem = async (taskId: number) => {
    try {
      await deleteGroupsTaskListsTasks({
        groupId,
        taskListId: selectedCategory?.id || 0,
        taskId,
      });
      deleteTask(taskId);
      refetch();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  if (!isLoading && taskLists.length === 0) {
    return (
      <p className="mt-40 text-center text-md font-medium text-t-default">
        아직 할 일 목록이 없습니다. <br /> 새로운 목록을 추가해주세요.
      </p>
    );
  }

  return (
    <div>
      <div
        className={`flex w-full space-x-5 whitespace-nowrap pb-2 text-lg font-medium ${styles.ListScrollbar}`}
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

      <ItemList
        taskListId={selectedCategory?.id || 0}
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
