import instance from '../libs/axios';
import {
  ArticleCommentResponseType,
  ArticleCommentParamsType,
} from '../types/articleComment';

// 게시글의 댓글 작성하기
const postArticlesComments = async (
  params: ArticleCommentParamsType['postArticlesComments']
): Promise<ArticleCommentResponseType['postArticlesComments']> => {
  const { articleId, content } = params;
  const response = await instance.post(`articles/${articleId}/comments`, {
    content,
  });
  return response.data;
};

// 게시글의 댓글 목록 조회하기
const getArticlesComment = async (
  params: ArticleCommentParamsType['getArticlesComment']
): Promise<ArticleCommentResponseType['getArticlesComment']> => {
  const { articleId, limit, cursor } = params;
  const response = await instance.get(`articles/${articleId}/comments`, {
    params: {
      limit,
      ...(cursor && { cursor }),
    },
  });
  return response.data;
};

// 게시글의 댓글 수정하기
const patchComments = async (
  params: ArticleCommentParamsType['patchComments']
): Promise<ArticleCommentResponseType['patchComments']> => {
  const { commentId, content } = params;
  const response = await instance.patch(`comments/${commentId}`, { content });
  return response.data;
};

// 게시글의 댓글 삭제하기
const deleteComments = async (
  params: ArticleCommentParamsType['deleteComments']
): Promise<void> => {
  const { commentId } = params;
  const response = await instance.delete(`comments/${commentId}`);
  return response.data;
};

export {
  postArticlesComments,
  getArticlesComment,
  patchComments,
  deleteComments,
};
