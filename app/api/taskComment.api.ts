import instance from '../libs/axios';
import {
  CommentResponseType,
  CommentParamsType,
  TaskCommentType,
} from '../types/taskComment';

// 댓글 가져오기
const getTaskComments = async ({
  taskId,
}: {
  taskId: number;
}): Promise<TaskCommentType[]> => {
  const response = await instance.get(`tasks/${taskId}/comments`);
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};

// 댓글 보내기
const postTasksComments = async (
  params: CommentParamsType['postTasksComments']
): Promise<CommentResponseType['postTasksComments']> => {
  const { taskId, content } = params;
  const response = await instance.post(`tasks/${taskId}/comments`, {
    content,
  });
  return response.data;
};

// 댓글 수정하기
const patchTasksComments = async (
  params: CommentParamsType['patchTasksComments']
): Promise<CommentResponseType['patchTasksComments']> => {
  const { taskId, commentId, content } = params;
  const response = await instance.patch(
    `tasks/${taskId}/comments/${commentId}`,
    { content }
  );
  return response.data;
};

// 댓글 삭제하기
const deleteTasksComments = async (
  params: CommentParamsType['deleteTasksComments']
): Promise<void> => {
  const { taskId, commentId } = params;
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
