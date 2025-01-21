export interface commentResponseType {
  getTaskComments: {
    message: string;
  };
  postTasksComments: {
    content: string;
    updatedAt: string;
    createdAt: string;
    id: number;
    user: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  patchTasksComments: {
    message: string;
  };
}
