import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//할 일 추가하기
const postGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  name: string,
  description: string,
  startDate: string,
  frequencyType: string,
  monthDay: number
) => {
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

//특정 일자, 특정 할일 리스트의 할일 리스트 가져오기
const getGroupsTaskListTasks = async (
  groupId: number,
  taskListId: number,
  date?: string
) => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    {
      params: date ? { date } : {}, // date가 있을 경우 쿼리 파라미터에 추가
    }
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 가져오기
const getGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number
) => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 수정하기
const patchGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  name: string,
  description: string,
  done: boolean
) => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done }
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 삭제하기
const deleteGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number
) => {
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 순서 변경하기
const patchGroupsTaskListTasksOrder = async (
  groupId: number,
  taskListId: number,
  id: number,
  displayIndex: number
) => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex }
  );
  return response.data;
};

//반복할 일 삭제하기
//recurringId: 반복할일 id (task 객체의 recurringId 필드, 반복설정으로 생성된 할일이 아닌, 반복설정 자체를 삭제)
const deleteGroupsTaskListsTasksRecurring = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number
) => {
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
