export interface userResponseType {
  getUser: {
    teamId: string;
    image: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    email: string;
    id: number;
    memberships: Array<{
      group: {
        teamId: string;
        updatedAt: string;
        createdAt: string;
        image: string;
        name: string;
        id: number;
      };
      role: 'ADMIN';
      userImage: string;
      userEmail: string;
      userName: string;
      groupId: number;
      userId: number;
    }>;
  };
  patchUser: {
    message: string;
  };
  getUserGroups: Array<{
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    id: number;
  }>;
  getUserMemberships: Array<{
    group: {
      teamId: string;
      updatedAt: string;
      createdAt: string;
      image: string;
      name: string;
      id: number;
    };
    role: 'ADMIN';
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  }>;
  getUserHistory: {
    tasksDone: Array<{
      displayIndex: number;
      writerId: number;
      userId: number;
      deletedAt: string;
      frequency: 'DAILY';
      description: string;
      name: string;
      recurringId: number;
      doneAt: string;
      date: string;
      updatedAt: string;
      id: number;
    }>;
  };
  postUserSendRestPasswordEmail: {
    message: string;
  };
  patchUserResetPassword: {
    message: string;
  };
  patchUserPassword: {
    message: string;
  };
}
