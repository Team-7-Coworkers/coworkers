import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//댓글 가져오기
const getTaskComments = async (taskId: number) => {
  const response = await instance.get(`tasks/${taskId}/comments`);
  return response.data;
};

//댓글 보내기
const postTasksComments = async (taskId: number, Content: string) => {
  const response = await instance.post(`tasks/${taskId}/comments`, { Content });
  return response.data;
};

//댓글 수정하기
const patchTasksComments = async (
  taskId: number,
  commentId: number,
  Content: string
) => {
  const response = await instance.patch(
    `tasks/${taskId}/comments/${commentId}`,
    { Content }
  );
  return response.data;
};

//댓글 삭제하기
const deleteTasksComments = async (taskId: number, commentId: number) => {
  const response = await instance.delete(
    `tasks/${taskId}/comments/${commentId}`
  );
  return response.data;
};

export {
  getTaskComments,
  postTasksComments,
  patchTasksComments,
  deleteTasksComments,
};
