import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const postGroupsTaskListsRecurring = async (
  groupId: number,
  taskListId: number,
  name: string,
  description: string,
  startDate: string,
  frequencyType: string,
  monthDay: number
) => {
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
