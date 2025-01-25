import instance from '../libs/axios';
import { RecurringResponseType } from '../types/recurring';

// 반복할 일 생성하기
const postGroupsTaskListsRecurring = async ({
  groupId,
  taskListId,
  name,
  description,
  startDate,
  frequencyType,
  monthDay,
}: {
  groupId: number;
  taskListId: number;
  name: string;
  description: string;
  startDate: string;
  frequencyType: string;
  monthDay: number;
}): Promise<RecurringResponseType> => {
  const response = await instance.post(
    `groups/${groupId}/task-lists/${taskListId}/recurring`,
    {
      name,
      description,
      startDate,
      frequencyType,
      monthDay,
    }
  );
  return response.data;
};

export { postGroupsTaskListsRecurring };
