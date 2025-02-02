import { create } from 'zustand';
import { TaskType } from '../types/shared';

interface TaskState {
  checkedItems: { [key: number]: boolean };
  tasks: { [key: number]: TaskType };

  toggleChecked: (taskId: number, checked: boolean) => void;
  setCheckedItems: (
    items:
      | { [key: number]: boolean }
      | ((prev: { [key: number]: boolean }) => { [key: number]: boolean })
  ) => void;

  updateTask: (taskId: number, name: string, description: string) => void;
  deleteTask: (taskId: number) => void;
  setTasks: (tasks: TaskType[]) => void;
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
}));
