import { TaskType } from './shared';

interface TaskListType {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: TaskType[];
}

export interface TaskListResponseType {
  getGroupsTaskLists: TaskListType;
  patchGroupsTaskLists: Omit<TaskListType, 'tasks'>;
  postGroupsTaskLists: Omit<TaskListType, 'tasks'>;
  patchGroupsTaskListOrder: {
    displayIndex: number;
  };
}
