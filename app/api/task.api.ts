import instance from '../libs/axios';
import { TaskResponseType, TaskParamsType } from '../types/task';

// 할 일 추가하기
const postGroupsTaskListsTasks = async (
  params: TaskParamsType['postGroupsTaskListsTasks']
): Promise<TaskResponseType['postGroupsTaskListsTasks']> => {
  const { groupId, taskListId, ...data } = params;
  const response = await instance.post(
    `groups/${groupId}/task-list/${taskListId}/tasks`,
    data
  );
  return response.data;
};

// 특정 일자, 특정 할일 리스트의 할일 리스트 가져오기
const getGroupsTaskListTasks = async (
  params: TaskParamsType['getGroupsTaskListTasks']
): Promise<TaskResponseType['getGroupsTaskListTasks']> => {
  const { groupId, taskListId, date } = params;
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    { params: date ? { date } : {} }
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 가져오기
const getGroupsTaskListsTasks = async (
  params: TaskParamsType['getGroupsTaskListsTasks']
): Promise<TaskResponseType['getGroupsTaskListsTasks']> => {
  const { groupId, taskListId, taskId } = params;
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 수정하기
const patchGroupsTaskListsTasks = async (
  params: TaskParamsType['patchGroupsTaskListsTasks']
): Promise<TaskResponseType['patchGroupsTaskListsTasks']> => {
  const { groupId, taskListId, taskId, ...data } = params;
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 삭제하기
const deleteGroupsTaskListsTasks = async (
  params: TaskParamsType['deleteGroupsTaskListsTasks']
): Promise<void> => {
  const { groupId, taskListId, taskId } = params;
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

// 특정 할일 목록의 할일 리스트 순서 변경하기
const patchGroupsTaskListTasksOrder = async (
  params: TaskParamsType['patchGroupsTaskListTasksOrder']
): Promise<TaskResponseType['patchGroupsTaskListTasksOrder']> => {
  const { groupId, taskListId, taskId, displayIndex } = params;
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
    { displayIndex }
  );
  return response.data;
};

// 반복할 일 삭제하기
const deleteGroupsTaskListsTasksRecurring = async (
  params: TaskParamsType['deleteGroupsTaskListsTasksRecurring']
): Promise<void> => {
  const { groupId, taskListId, taskId, recurringId } = params;
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
