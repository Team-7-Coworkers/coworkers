import { UserProfileType } from './user';

export type FrequencyType = 'ONCE' | 'MONTHLY' | 'WEEKLY' | 'DAILY';

export type FrequencySpecificParams =
  | {
      frequencyType: 'MONTHLY'; // MONTHLY일 때 monthDay 필수
      monthDay: number;
      weekDays?: never; // weekDays는 허용하지 않음
    }
  | {
      frequencyType: 'WEEKLY'; // WEEKLY일 때 weekDays 필수
      weekDays: number[]; // 0~6의 배열
      monthDay?: never; // monthDay는 허용하지 않음
    }
  | {
      frequencyType: 'DAILY' | 'ONCE'; // DAILY와 ONCE는 둘 다 추가 필드 없음
      monthDay?: never;
      weekDays?: never;
    };

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
  doneAt: string | null;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface TaskHistoryType
  extends Omit<TaskType, 'doneBy' | 'writer' | 'commentCount'> {
  writerId: number;
  userId: number;
}
