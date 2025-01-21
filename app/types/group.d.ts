export interface groupResponseType {
  getGroups: {
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    id: number;
    members: Array<{
      role: 'ADMIN';
      userImage: string;
      userEmail: string;
      userName: string;
      groupId: number;
      userId: number;
    }>;
    taskLists: Array<{
      displayIndex: number;
      groupId: number;
      updatedAt: string;
      createdAt: string;
      name: string;
      id: number;
      tasks: string[];
    }>;
  };
  patchGroups: {
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    id: number;
  };
  postGroups: {
    name: string;
    image: string;
    updatedAt: string;
    createdAt: string;
    id: number;
  };
  getGroupsMember: {
    role: 'ADMIN';
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  };
  getGroupsInvitation: string;
  postGroupsAcceptInvitation: {
    groupId: number;
  };
  postGroupsMember: {
    userEmail: string;
  };
  getGroupsTasks: {
    doneBy: {
      user: {
        image: string;
        nickname: string;
        id: number;
      };
    };
    writer: {
      image: string;
      nickname: string;
      id: number;
    };
    displayIndex: number;
    commentCount: number;
    deletedAt: string;
    recurringId: number;
    frequency: 'DAILY';
    updatedAt: string;
    doneAt: string;
    date: string;
    description: string;
    name: string;
    id: number;
  };
}
