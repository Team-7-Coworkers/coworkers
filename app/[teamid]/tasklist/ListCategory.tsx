'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  updateTrigger: boolean;
  onCategoryChange: (taskListId: number) => void;
  onTaskClick: (taskId: number) => void;
};

export default function ListCategory({
  selectedDate,
  taskLists,
  groupId,
  updateTrigger,
  onCategoryChange,
  onTaskClick,
}: ListCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    TaskListResponseType['getGroupsTaskLists'] | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const { setTasks, setCheckedItems, updateTask, deleteTask, tasks } =
    useTaskStore();

  const fetchTasks = useCallback(async () => {
    if (!selectedCategory) return;

    setIsLoading(true);
    try {
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(
        2,
        '0'
      )}T00:00:00Z`;

      const response = await getGroupsTaskListTasks({
        groupId,
        taskListId: selectedCategory.id,
        date: formattedDate,
      });

      setTasks(response);

      const initialCheckedItems: { [key: number]: boolean } = {};
      response.forEach((task) => {
        initialCheckedItems[task.id] = !!task.doneAt;
      });

      setCheckedItems(initialCheckedItems);
    } catch (err) {
      console.error('Tasks를 불러오는 중 오류가 발생했습니다:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedDate, groupId, setTasks, setCheckedItems]);

  useEffect(() => {
    if (taskLists.length > 0 && !selectedCategory) {
      setSelectedCategory(taskLists[0]);
      onCategoryChange(taskLists[0].id);
    }
  }, [taskLists, selectedCategory, onCategoryChange]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, updateTrigger]);

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

      updateTask(taskId, name, description);
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
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  if (taskLists.length === 0 && !isLoading) {
    return (
      <p className="mt-40 text-center text-md font-medium text-t-default">
        아직 할 일 목록이 없습니다. <br />
        새로운 목록을 추가해주세요.
      </p>
    );
  }

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

      <ItemList
        items={Object.values(tasks)}
        onTaskClick={onTaskClick}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
