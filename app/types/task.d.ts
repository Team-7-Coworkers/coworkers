import { RecurringResponseType } from './recurring';
import { TaskHistoryType, TaskType } from './shared';

export interface TaskResponseType {
  postGroupsTaskListsTasks: {
    recurring: RecurringResponseType;
  };

  getGroupsTaskListTasks: TaskType[];
  getGroupsTaskListsTasks: TaskType;
  patchGroupsTaskListsTasks: TaskHistoryType;

  patchGroupsTaskListTasksOrder: {
    displayIndex: number;
  };
}

export interface TaskParamsType {
  postGroupsTaskListsTasks:
    | {
        frequencyType: 'MONTHLY';
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        monthDay: number; // 필수
        weekDays?: never; // 허용되지 않음
      }
    | {
        frequencyType: 'WEEKLY';
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        weekDays: number[]; // 필수
        monthDay?: never; // 허용되지 않음
      }
    | {
        frequencyType: 'DAILY' | 'ONCE';
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        monthDay?: never; // 허용되지 않음
        weekDays?: never; // 허용되지 않음
      };

  getGroupsTaskListTasks: {
    groupId: number;
    taskListId: number;
    date?: string;
  };

  getGroupsTaskListsTasks: {
    groupId: number;
    taskListId: number;
    taskId: number;
  };

  patchGroupsTaskListsTasks: {
    groupId: number;
    taskListId: number;
    taskId: number;
    name?: string;
    description?: string;
    done?: boolean;
  };

  deleteGroupsTaskListsTasks: {
    groupId: number;
    taskListId: number;
    taskId: number;
  };

  patchGroupsTaskListTasksOrder: {
    groupId: number;
    taskListId: number;
    taskId: number;
    displayIndex: number;
  };

  deleteGroupsTaskListsTasksRecurring: {
    groupId: number;
    taskListId: number;
    taskId: number;
    recurringId: number;
  };
}
