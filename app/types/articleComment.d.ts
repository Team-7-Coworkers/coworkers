export interface articleCommentResponseType {
  postArticlesComments:
    | {
        writer: {
          image: string;
          nickname: string;
          id: number;
        };
        updatedAt: string;
        createdAt: string;
        content: string;
        id: number;
      }
    | {
        message: string;
      };
  getArticlesComment:
    | {
        nextCursor: number;
        list: Array<{
          writer: {
            image: string;
            nickname: string;
            id: number;
          };
          updatedAt: string;
          createdAt: string;
          content: string;
          id: number;
        }>;
      }
    | {
        message: string;
      };
  patchComments:
    | {
        writer: {
          image: string;
          nickname: string;
          id: number;
        };
        updatedAt: string;
        createdAt: string;
        content: string;
        id: number;
      }
    | {
        message: string;
      };
}
