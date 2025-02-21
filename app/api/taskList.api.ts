import instance from '../libs/axios';
import { TaskListResponseType, TaskListParamsType } from '../types/taskList';

// 그룹 할일 목록 가져오기
const getGroupsTaskLists = async (
  params: TaskListParamsType['getGroupsTaskLists']
): Promise<TaskListResponseType['getGroupsTaskLists']> => {
  const { groupId, taskListId, date } = params;
  const response = await instance.get(`groups/${groupId}/task-lists/${taskListId}`, {
    params: date ? { date } : {},
  });
  return response.data;
};

// 그룹 할일 목록 이름 변경하기
const patchGroupsTaskLists = async (
  params: TaskListParamsType['patchGroupsTaskLists']
): Promise<TaskListResponseType['patchGroupsTaskLists']> => {
  const { groupId, taskListId, name } = params;
  const response = await instance.patch(`groups/${groupId}/task-lists/${taskListId}`, {
    name,
  });
  return response.data;
};

// 그룹 할일 목록 삭제하기
const deleteGroupsTaskLists = async (
  params: TaskListParamsType['deleteGroupsTaskLists']
): Promise<void> => {
  const { groupId, taskListId } = params;
  const response = await instance.delete(`groups/${groupId}/task-lists/${taskListId}`);
  return response.data;
};

// 그룹 할일 목록 추가하기
const postGroupsTaskLists = async (
  params: TaskListParamsType['postGroupsTaskLists']
): Promise<TaskListResponseType['postGroupsTaskLists']> => {
  const { groupId, name } = params;
  const response = await instance.post(`groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

// 그룹 할일 목록 순서 변경하기
const patchGroupsTaskListOrder = async (
  params: TaskListParamsType['patchGroupsTaskListOrder']
): Promise<TaskListResponseType['patchGroupsTaskListOrder']> => {
  const { groupId, taskListId, displayIndex } = params;
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/order`,
    { displayIndex }
  );
  return response.data;
};

export {
  getGroupsTaskLists,
  patchGroupsTaskLists,
  deleteGroupsTaskLists,
  postGroupsTaskLists,
  patchGroupsTaskListOrder,
};
