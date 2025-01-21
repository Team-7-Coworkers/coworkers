export interface taskListResponseType {
  getGroupsTaskLists: {
    displayIndex: number;
    groupId: number;
    updatedAt: string;
    createdAt: string;
    name: string;
    id: number;
    tasks: Array<{
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
    }>;
  };
  patchGroupsTaskLists: {
    displayIndex: number;
    groupId: number;
    updatedAt: string;
    createdAt: string;
    name: string;
    id: number;
  };
  postGroupsTaskLists: {
    displayIndex: number;
    groupId: number;
    updatedAt: string;
    createdAt: string;
    name: string;
    id: number;
  };
  patchGroupsTaskListOrder: {
    displayIndex: number;
  };
}
