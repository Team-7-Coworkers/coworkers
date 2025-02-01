import { create } from 'zustand';

interface TaskState {
  checkedItems: { [key: number]: boolean };
  toggleChecked: (taskId: number, checked: boolean) => void;
  setCheckedItems: (items: { [key: number]: boolean }) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  checkedItems: {},
  toggleChecked: (taskId, checked) =>
    set((state) => ({
      checkedItems: {
        ...state.checkedItems,
        [taskId]: checked,
      },
    })),
  setCheckedItems: (items) =>
    set(() => ({
      checkedItems: items,
    })),
}));
