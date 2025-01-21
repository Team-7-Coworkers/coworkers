import axios from 'axios';
import { articleCommentResponseType } from '../types/articleComment';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 게시글의 댓글 작성하기
const postArticlesComments = async ({
  articleId,
  content,
}: {
  articleId: number;
  content: string;
}): Promise<articleCommentResponseType['postArticlesComments']> => {
  const response = await instance.post(`articles/${articleId}/comments`, {
    content,
  });
  return response.data;
};

// 게시글의 댓글 목록 조회하기
const getArticlesComment = async ({
  articleId,
  limit,
  cursor,
}: {
  articleId: number;
  limit: number;
  cursor?: number;
}): Promise<articleCommentResponseType['getArticlesComment']> => {
  const response = await instance.get(`articles/${articleId}/comments`, {
    params: {
      limit,
      ...(cursor && { cursor }),
    },
  });
  return response.data;
};

// 게시글의 댓글 수정하기
const patchComments = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}): Promise<articleCommentResponseType['patchComments']> => {
  const response = await instance.patch(`comments/${commentId}`, { content });
  return response.data;
};

// 게시글의 댓글 삭제하기
const deleteComments = async ({ commentId }: { commentId: number }) => {
  const response = await instance.delete(`comments/${commentId}`);
  return response.data;
};

export {
  postArticlesComments,
  getArticlesComment,
  patchComments,
  deleteComments,
};
