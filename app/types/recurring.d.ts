import { FrequencyType } from './shared';

export interface RecurringResponseType {
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay?: number;
  weekDays?: number[];
  frequencyType: FrequencyType;
  startDate: string;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
}
export type RecurringParamsType = {
  postGroupsTaskListsRecurring:
    | {
        frequencyType: 'MONTHLY'; // MONTHLY일 때
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        monthDay: number; // 필수
        weekDays?: never; // 허용되지 않음
      }
    | {
        frequencyType: 'WEEKLY'; // WEEKLY일 때
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        weekDays: number[]; // 필수
        monthDay?: never; // 허용되지 않음
      }
    | {
        frequencyType: 'DAILY' | 'ONCE'; // DAILY나 ONCE일 때
        groupId: number;
        taskListId: number;
        name: string;
        description?: string;
        startDate: string;
        monthDay?: never; // 허용되지 않음
        weekDays?: never; // 허용되지 않음
      };
};
