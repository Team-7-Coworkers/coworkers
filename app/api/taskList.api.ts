import instance from '../libs/axios';
import { taskListResponseType } from '../types/taskList';

// 그룹 할일 목록 가져오기
const getGroupsTaskLists = async ({
  groupId,
  id,
}: {
  groupId: number;
  id: number;
}): Promise<taskListResponseType['getGroupsTaskLists']> => {
  const response = await instance.get(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

// 그룹 할일 목록 이름 변경하기
const patchGroupsTaskLists = async ({
  name,
  groupId,
  id,
}: {
  name: string;
  groupId: number;
  id: number;
}): Promise<taskListResponseType['patchGroupsTaskLists']> => {
  const response = await instance.patch(`groups/${groupId}/task-lists/${id}`, {
    name,
  });
  return response.data;
};

// 그룹 할일 목록 삭제하기
const deleteGroupsTaskLists = async ({
  groupId,
  id,
}: {
  groupId: number;
  id: number;
}) => {
  const response = await instance.delete(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

// 그룹 할일 목록 추가하기
const postGroupsTaskLists = async ({
  name,
  groupId,
}: {
  name: string;
  groupId: number;
}): Promise<taskListResponseType['postGroupsTaskLists']> => {
  const response = await instance.post(`groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

// 그룹 할일 목록 순서 변경하기
const patchGroupsTaskListOrder = async ({
  displayIndex,
  groupId,
  id,
}: {
  displayIndex: number;
  groupId: number;
  id: number;
}): Promise<taskListResponseType['patchGroupsTaskListOrder']> => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${id}/order`,
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
