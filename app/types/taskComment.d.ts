import { UserProfileType } from './articleComment';

export interface TaskCommentType {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: UserProfileType;
}

export interface CommentResponseType {
  getTaskComments: {
    message: string;
  };
  postTasksComments: TaskCommentType;
  patchTasksComments: {
    message: string;
  };
}
