export interface taskResponseType {
  postGroupsTaskListsTasks: {
    recurring: {
      writerId: number;
      groupId: number;
      taskListId: number;
      monthDay: number;
      weekDays: number[];
      frequencyType: 'DAILY';
      startDate: string;
      updatedAt: string;
      createdAt: string;
      description: string;
      name: string;
      id: number;
    };
  };
  getGroupsTaskListTasks: Array<{
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
  getGroupsTaskListsTasks: {
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
  patchGroupsTaskListsTasks: {
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
  };
  patchGroupsTaskListTasksOrder: {
    displayIndex: number;
  };
}
