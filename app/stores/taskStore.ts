import { create } from 'zustand';
import { TaskType } from '../types/shared';

interface TaskState {
  checkedItems: { [key: number]: boolean }; // 체크 저장
  tasks: { [key: number]: TaskType }; // task
  toggleChecked: (taskId: number, checked: boolean) => void; // 특정 task 체크 상태 관리
  setCheckedItems: (
    // 체크 상태 변경
    items:
      | { [key: number]: boolean }
      | ((prev: { [key: number]: boolean }) => { [key: number]: boolean })
  ) => void;

  updateTask: (taskId: number, name: string, description: string) => void; // 수정
  deleteTask: (taskId: number) => void; // 삭제
  setTasks: (tasks: TaskType[]) => void; // tasks 관리
  updateCommentCount: (taskId: number, count: number) => void; // 댓글 갯수 관리
}

export const useTaskStore = create<TaskState>((set) => ({
  checkedItems: {},
  tasks: {},

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

  updateTask: (taskId, name, description) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: { ...state.tasks[taskId], name, description },
      },
    })),

  deleteTask: (taskId) =>
    set((state) => {
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[taskId];

      const updatedCheckedItems = { ...state.checkedItems };
      delete updatedCheckedItems[taskId];

      return {
        tasks: updatedTasks,
        checkedItems: updatedCheckedItems,
      };
    }),

  setTasks: (tasks) =>
    set(() => {
      const newTasks = tasks.reduce(
        (acc, task) => {
          acc[task.id] = task;
          return acc;
        },
        {} as { [key: number]: TaskType }
      );

      return {
        tasks: newTasks,
      };
    }),

  updateCommentCount: (taskId, count) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          commentCount: count,
        },
      },
    })),
}));
