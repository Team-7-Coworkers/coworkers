import instance from '../libs/axios';
import { taskResponseType } from '../types/task';

// 할 일 추가하기
const postGroupsTaskListsTasks = async ({
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
}): Promise<taskResponseType['postGroupsTaskListsTasks']> => {
  const response = await instance.post(
    `groups/${groupId}/task-list/${taskListId}/tasks`,
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

// 특정 일자, 특정 할일 리스트의 할일 리스트 가져오기
const getGroupsTaskListTasks = async ({
  groupId,
  taskListId,
  date,
}: {
  groupId: number;
  taskListId: number;
  date?: string;
}): Promise<taskResponseType['getGroupsTaskListTasks']> => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    {
      params: date ? { date } : {},
    }
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 가져오기
const getGroupsTaskListsTasks = async ({
  groupId,
  taskListId,
  taskId,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
}): Promise<taskResponseType['getGroupsTaskListsTasks']> => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 수정하기
const patchGroupsTaskListsTasks = async ({
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
  name: string;
  description: string;
  done: boolean;
}): Promise<taskResponseType['patchGroupsTaskListsTasks']> => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done }
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 삭제하기
const deleteGroupsTaskListsTasks = async ({
  groupId,
  taskListId,
  taskId,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
}) => {
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 순서 변경하기
const patchGroupsTaskListTasksOrder = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: {
  groupId: number;
  taskListId: number;
  id: number;
  displayIndex: number;
}): Promise<taskResponseType['patchGroupsTaskListTasksOrder']> => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex }
  );
  return response.data;
};

// 반복할 일 삭제하기
const deleteGroupsTaskListsTasksRecurring = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
  recurringId: number;
}) => {
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`
  );
  return response.data;
};

export {
  postGroupsTaskListsTasks,
  getGroupsTaskListTasks,
  getGroupsTaskListsTasks,
  patchGroupsTaskListsTasks,
  deleteGroupsTaskListsTasks,
  patchGroupsTaskListTasksOrder,
  deleteGroupsTaskListsTasksRecurring,
};
