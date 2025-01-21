import axios from 'axios';
import { commentResponseType } from '../types/comment';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 댓글 가져오기
const getTaskComments = async ({
  taskId,
}: {
  taskId: number;
}): Promise<commentResponseType['getTaskComments']> => {
  const response = await instance.get(`tasks/${taskId}/comments`);
  return response.data;
};

// 댓글 보내기
const postTasksComments = async ({
  taskId,
  content,
}: {
  taskId: number;
  content: string;
}): Promise<commentResponseType['postTasksComments']> => {
  const response = await instance.post(`tasks/${taskId}/comments`, {
    content,
  });
  return response.data;
};

// 댓글 수정하기
const patchTasksComments = async ({
  taskId,
  commentId,
  content,
}: {
  taskId: number;
  commentId: number;
  content: string;
}): Promise<commentResponseType['patchTasksComments']> => {
  const response = await instance.patch(
    `tasks/${taskId}/comments/${commentId}`,
    { content }
  );
  return response.data;
};

// 댓글 삭제하기
const deleteTasksComments = async ({
  taskId,
  commentId,
}: {
  taskId: number;
  commentId: number;
}) => {
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
