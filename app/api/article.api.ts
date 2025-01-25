import instance from '../libs/axios';
import { ArticleResponseType, ArticleParamsType } from '../types/article';

// 게시글 올리기
const postArticles = async (
  params: ArticleParamsType['postArticles']
): Promise<ArticleResponseType['postArticles']> => {
  const response = await instance.post(`articles`, params);
  return response.data;
};

// 게시글 목록 조회하기
const getArticles = async (
  params: ArticleParamsType['getArticles']
): Promise<ArticleResponseType['getArticles']> => {
  const response = await instance.get(`articles`, { params });
  return response.data;
};

// 게시글 상세 조회하기
const getDetailsArticle = async (
  params: ArticleParamsType['getDetailsArticle']
): Promise<ArticleResponseType['getDetailsArticle']> => {
  const { articleId } = params;
  const response = await instance.get(`articles/${articleId}`);
  return response.data;
};

// 게시글 수정하기
const patchArticles = async (
  params: ArticleParamsType['patchArticles']
): Promise<ArticleResponseType['patchArticles']> => {
  const { articleId, ...data } = params;
  const response = await instance.patch(`articles/${articleId}`, data);
  return response.data;
};

// 게시글 삭제하기
const deleteArticles = async (
  params: ArticleParamsType['deleteArticles']
): Promise<void> => {
  const { articleId } = params;
  const response = await instance.delete(`articles/${articleId}`);
  return response.data;
};

// 게시글 좋아요 달기
const postArticlesLike = async (
  params: ArticleParamsType['postArticlesLike']
): Promise<ArticleResponseType['postArticlesLike']> => {
  const { articleId } = params;
  const response = await instance.post(`articles/${articleId}/like`);
  return response.data;
};

// 게시글 좋아요 취소하기
const deleteArticlesLike = async (
  params: ArticleParamsType['deleteArticlesLike']
): Promise<void> => {
  const { articleId } = params;
  const response = await instance.delete(`articles/${articleId}/like`);
  return response.data;
};

export {
  postArticles,
  getArticles,
  getDetailsArticle,
  patchArticles,
  deleteArticles,
  postArticlesLike,
  deleteArticlesLike,
};
