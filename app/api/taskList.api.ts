import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//그룹 할일 목록 가져오기
const getGroupsTaskLists = async (groupId: number, id: number) => {
  const response = await instance.get(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

//그룹 할일 목록 이름 변경하기
const patchGroupsTaskLists = async (
  name: string,
  groupId: number,
  id: number
) => {
  const response = await instance.patch(`groups/${groupId}/task-lists/${id}`, {
    name,
  });
  return response.data;
};

//그룹 할일 목록 삭제하기
const deleteGroupsTaskLists = async (groupId: number, id: number) => {
  const response = await instance.delete(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

//그룹 할일 목록 추가하기
const postGroupsTaskLists = async (name: string, groupId: number) => {
  const response = await instance.post(`groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

//그룹 할일 목록 순서 변경하기
//taskList의 displayIndex를 변경합니다. 해당 taskList가 기존 displayIndex를 버리고 넘어가면서, 그 빈 displayIndex는 "한 자리씩 당겨지는 식"으로 변경됩니다. [1,2,3,4] => (3을 0 인덱스로) => [3,1,2,4] => (4를 1 인덱스로) => [3,4,1,2]
const patchGroupsTaskListOrder = async (
  displayIndex: number,
  groupId: number,
  id: number
) => {
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
