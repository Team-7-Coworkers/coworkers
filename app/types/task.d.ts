import { UserProfileType } from './articleComment';
import { RecurringResponseType } from './recurring';

export type FrequencyType = 'ONCE' | 'MONTHLY' | 'WEEKLY' | 'DAILY';

export interface TaskType {
  doneBy: {
    user: UserProfileType;
  };
  writer: UserProfileType;
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: FrequencyType;
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface TaskHistoryType
  extends Omit<TaskType, 'doneBy', 'writer', 'commentCount'> {
  writerId: number;
  userId: number;
}

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
