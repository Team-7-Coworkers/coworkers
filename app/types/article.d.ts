import { ErrorResponse, UserProfileType } from './shared';

export interface ArticleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Omit<UserProfileType, 'image'>;
  image: string;
  title: string;
  id: number;
}

export interface DetailedArticleType extends ArticleType {
  commentCount: number;
  isLiked: boolean;
  content: string;
}

export interface ArticleResponseType {
  postArticles: ArticleType;

  getArticles: {
    totalCount: number;
    list: ArticleType[];
  };

  getDetailsArticle: DetailedArticleType | ErrorResponse;
  patchArticles: DetailedArticleType | ErrorResponse;
  postArticlesLike: DetailedArticleType | ErrorResponse;
}
