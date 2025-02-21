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

export interface TaskListParamsType {
  getGroupsTaskLists: {
    groupId: number;
    taskListId: number;
    date?: string;
  };

  patchGroupsTaskLists: {
    name: string;
    groupId: number;
    taskListId: number;
  };

  deleteGroupsTaskLists: {
    groupId: number;
    taskListId: number;
  };

  postGroupsTaskLists: {
    name: string;
    groupId: number;
  };

  patchGroupsTaskListOrder: {
    displayIndex: number;
    groupId: number;
    taskListId: number;
  };
}
