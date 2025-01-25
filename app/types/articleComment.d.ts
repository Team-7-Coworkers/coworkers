import { ErrorResponse, UserProfileType } from './shared';

export interface ArticleCommentType {
  writer: UserProfileType;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface ArticleCommentListType {
  nextCursor: number;
  list: ArticleCommentType[];
}

export interface ArticleCommentResponseType {
  postArticlesComments: ArticleCommentType | ErrorResponse;
  getArticlesComment: ArticleCommentListType | ErrorResponse;
  patchComments: ArticleCommentType | ErrorResponse;
}
