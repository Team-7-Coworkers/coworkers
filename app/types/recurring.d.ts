import { FrequencyType } from './task';

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
