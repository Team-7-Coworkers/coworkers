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
