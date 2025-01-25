import { UserProfileType } from './shared';

interface TaskCommentType {
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

export interface CommentParamsType {
  getTaskComments: {
    taskId: number;
  };

  postTasksComments: {
    taskId: number;
    content: string;
  };

  patchTasksComments: {
    taskId: number;
    commentId: number;
    content: string;
  };

  deleteTasksComments: {
    taskId: number;
    commentId: number;
  };
}
