import instance from '../libs/axios';
import { RecurringResponseType, RecurringParamsType } from '../types/recurring';

// 반복할 일 생성하기
const postGroupsTaskListsRecurring = async (
  params: RecurringParamsType['postGroupsTaskListsRecurring']
): Promise<RecurringResponseType> => {
  const { groupId, taskListId, ...data } = params;

  const response = await instance.post(
    `groups/${groupId}/task-lists/${taskListId}/recurring`,
    data
  );
  return response.data;
};

export { postGroupsTaskListsRecurring };
