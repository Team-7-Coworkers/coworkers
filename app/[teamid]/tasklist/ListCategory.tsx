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
import { TaskResponseType } from '@/app/types/task';

type ListCategoryProps = {
  selectedDate: Date;
  taskLists: TaskListResponseType['getGroupsTaskLists'][];
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
  const [selectedCategory, setSelectedCategory] = useState<
    TaskListResponseType['getGroupsTaskLists'] | null
  >(taskLists.length > 0 ? taskLists[0] : null);

  const [tasks, setTasks] = useState<
    TaskResponseType['getGroupsTaskListTasks']
  >([]);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const fetchTasks = useCallback(async () => {
    if (!selectedCategory) return;

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

      const initialCheckedItems = response.reduce(
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
  }, [selectedCategory, selectedDate, groupId]);

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
      const taskToEdit = tasks.find((task) => task.id === taskId);
      if (!taskToEdit) throw new Error('Task not found');

      await patchGroupsTaskListsTasks({
        groupId,
        taskListId: selectedCategory?.id || 0,
        taskId,
        name,
        description,
        done: !!taskToEdit.doneAt,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, name, description } : task
        )
      );
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
      fetchTasks();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
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

            await patchGroupsTaskListsTasks({
              groupId,
              taskListId: selectedCategory.id,
              taskId: id,
              done: checked,
            });
          }}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
}
