import { UserProfileType } from './articleComment';

interface ArticleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Omit<UserProfileType, 'image'>;
  image: string;
  title: string;
  id: number;
}

interface DetailedArticleType extends ArticleType {
  commentCount: number;
  isLiked: boolean;
  content: string;
}

export interface ErrorResponse {
  message: string;
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
