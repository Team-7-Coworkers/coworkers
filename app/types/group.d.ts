import { GroupType, MemberShipType, TaskType } from './shared';

interface GroupDataType extends GroupType {
  members: MemberShipType[];
  taskLists: Omit<TaskType, 'doneBy' | 'writer'>[];
}

export interface GroupResponseType {
  getGroups: GroupDataType;
  patchGroups: GroupType;
  postGroups: Omit<GroupType, 'teamId'>;
  getGroupsMember: Omit<MemberShipType, 'group'>;
  getGroupsInvitation: string;
  postGroupsAcceptInvitation: {
    groupId: number;
  };
  postGroupsMember: {
    userEmail: string;
  };
  getGroupsTasks: TaskType[];
}
