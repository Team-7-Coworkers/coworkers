import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//게시글의 댓글 작성하기
const postArticlesComments = async (articleId: number, content: string) => {
  const response = await instance.post(`articles/${articleId}/comments`, {
    content,
  });
  return response.data;
};

// 게시글의 댓글 목록 조회하기
const getArticlesComment = async (
  articleId: number,
  limit: number,
  cursor?: number
) => {
  const response = await instance.get(`articles/${articleId}/comments`, {
    params: {
      limit,
      ...(cursor && { cursor }),
    },
  });
  return response.data;
};

//게시글의 댓글 수정하기
const patchComments = async (commentId: number, content: string) => {
  const response = await instance.patch(`comments/${commentId}`, { content });
  return response.data;
};

//게시글의 댓글 삭제하기
const deleteComments = async (commentId: number) => {
  const response = await instance.patch(`comments/${commentId}`);
  return response.data;
};

export {
  postArticlesComments,
  getArticlesComment,
  patchComments,
  deleteComments,
};
