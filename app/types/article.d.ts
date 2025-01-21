export interface articleResponseType {
  postArticles: {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    writer: {
      nickname: string;
      id: number;
    };
    image: string;
    title: string;
    id: number;
  };

  getArticles: {
    totalCount: number;
    list: Array<{
      updatedAt: string;
      createdAt: string;
      likeCount: number;
      writer: {
        nickname: string;
        id: number;
      };
      image: string;
      title: string;
      id: number;
    }>;
  };
  getDetailsArticle:
    | {
        updatedAt: string;
        createdAt: string;
        likeCount: number;
        writer: {
          nickname: string;
          id: number;
        };
        image: string;
        title: string;
        id: number;
        commentCount: number;
        isLiked: boolean;
        content: string;
      }
    | {
        message: string;
      };
  patchArticles:
    | {
        updatedAt: string;
        createdAt: string;
        likeCount: number;
        writer: {
          nickname: string;
          id: number;
        };
        image: string;
        title: string;
        id: number;
        commentCount: number;
        isLiked: boolean;
        content: string;
      }
    | {
        message: string;
      };
  postArticlesLike:
    | {
        updatedAt: string;
        createdAt: string;
        likeCount: number;
        writer: {
          nickname: string;
          id: number;
        };
        image: string;
        title: string;
        id: number;
        commentCount: number;
        isLiked: boolean;
        content: string;
      }
    | {
        message: string;
      };
}
