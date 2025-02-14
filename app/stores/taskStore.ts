import { create } from 'zustand';
import { TaskType } from '../types/shared';

interface TaskState {
  checkedItems: { [key: number]: boolean }; // 체크 저장
  tasks: { [taskListId: number]: { [taskId: number]: TaskType } }; // 목록별 Task 저장
  selectedCategory: number | null; // 선택한 목록
  setSelectedCategory: (taskListId: number) => void;
  toggleChecked: (taskId: number, checked: boolean) => void; // 특정 task 체크 상태 관리
  setCheckedItems: (
    items:
      | { [key: number]: boolean }
      | ((prev: { [key: number]: boolean }) => { [key: number]: boolean })
  ) => void;

  updateTask: (
    taskListId: number,
    taskId: number,
    name: string,
    description: string
  ) => void; // 목록별 수정
  deleteTask: (taskListId: number, taskId: number) => void; //  삭제
  setTasks: (taskListId: number, tasks: TaskType[]) => void; // 관리
  updateCommentCount: (
    taskListId: number,
    taskId: number,
    count: number
  ) => void; // 댓글 갯수 관리
}

export const useTaskStore = create<TaskState>((set) => ({
  checkedItems: {},
  tasks: {}, // taskListId 별로 저장하도록 수정
  selectedCategory: null,

  setSelectedCategory: (taskListId) =>
    set(() => ({
      selectedCategory: taskListId,
    })),

  toggleChecked: (taskId, checked) =>
    set((state) => ({
      checkedItems: {
        ...state.checkedItems,
        [taskId]: checked,
      },
    })),

  setCheckedItems: (items) =>
    set((state) => ({
      checkedItems:
        typeof items === 'function' ? items(state.checkedItems) : items,
    })),

  updateTask: (taskListId, taskId, name, description) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskListId]: {
          ...state.tasks[taskListId],
          [taskId]: {
            ...state.tasks[taskListId]?.[taskId],
            name,
            description,
          },
        },
      },
    })),

  deleteTask: (taskListId, taskId) =>
    set((state) => {
      const updatedTasks = { ...state.tasks[taskListId] };
      delete updatedTasks[taskId];

      return {
        tasks: {
          ...state.tasks,
          [taskListId]: updatedTasks,
        },
      };
    }),

  setTasks: (taskListId, tasks) =>
    set((state) => {
      const updatedTasks = tasks.reduce(
        (acc, task, index) => {
          acc[task.id] = { ...task, displayIndex: index };
          return acc;
        },
        {} as Record<number, TaskType>
      );

      return {
        tasks: {
          ...state.tasks,
          [taskListId]: updatedTasks,
        },
      };
    }),

  updateCommentCount: (taskListId, taskId, count) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskListId]: {
          ...state.tasks[taskListId],
          [taskId]: {
            ...state.tasks[taskListId]?.[taskId],
            commentCount: count,
          },
        },
      },
    })),
}));
