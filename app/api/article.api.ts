import axios from 'axios';
import { articleResponseType } from '../types/article';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 게시글 올리기
const postArticles = async ({
  image,
  content,
  title,
}: {
  image: string;
  content: string;
  title: string;
}): Promise<articleResponseType['postArticles']> => {
  const response = await instance.post(`articles`, { image, content, title });
  return response.data;
};

// 게시글 목록 조회하기
const getArticles = async ({
  page = 1,
  pageSize = 6,
  orderBy = 'recent',
  keyword = '',
}: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}): Promise<articleResponseType['postArticles']> => {
  const response = await instance.get(`articles`, {
    params: {
      page,
      pageSize,
      orderBy,
      keyword, // 검색 키워드
    },
  });
  return response.data;
};

// 게시글 상세 조회하기
const getDetailsArticle = async ({
  articleId,
}: {
  articleId: number;
}): Promise<articleResponseType['getDetailsArticle']> => {
  const response = await instance.get(`articles/${articleId}`);
  return response.data;
};

// 게시글 수정하기
const patchArticles = async ({
  articleId,
  image,
  content,
  title,
}: {
  articleId: number;
  image: string;
  content: string;
  title: string;
}): Promise<articleResponseType['patchArticles']> => {
  const response = await instance.patch(`articles/${articleId}`, {
    image,
    content,
    title,
  });
  return response.data;
};

// 게시글 삭제하기
const deleteArticles = async ({ articleId }: { articleId: number }) => {
  const response = await instance.delete(`articles/${articleId}`);
  return response.data;
};

// 게시글 좋아요 달기
const postArticlesLike = async ({
  articleId,
}: {
  articleId: number;
}): Promise<articleResponseType['postArticlesLike']> => {
  const response = await instance.post(`articles/${articleId}/like`);
  return response.data;
};

// 게시글 좋아요 취소하기
const deleteArticlesLike = async ({ articleId }: { articleId: number }) => {
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
