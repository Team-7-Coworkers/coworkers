import { GroupType, MemberShipType, TaskType } from './shared';

interface GroupDataType extends GroupType {
  members: MemberShipType[];
  taskLists: Omit<TaskType, 'doneBy' | 'writer'>[];
}

export interface GroupResponseType {
  getGroups: GroupDataType;
  patchGroups: GroupType;
  postGroups: Omit<GroupType, 'teamgroupId'>;
  getGroupsMember: Omit<MemberShipType, 'group'>;
  getGroupsInvitation: string;
  postGroupsAcceptInvitation: {
    groupgroupId: number;
  };
  postGroupsMember: {
    userEmail: string;
  };
  getGroupsTasks: TaskType[];
}

export interface GroupParamsType {
  getGroups: {
    groupId: number;
  };

  patchGroups: {
    groupId: number;
    image?: string | null;
    name?: string;
  };

  deleteGroups: {
    groupId: number;
  };

  postGroups: {
    image?: string;
    name: string;
  };

  getGroupsMember: {
    groupId: number;
    memberUserId: number;
  };

  deleteGroupsMember: {
    groupId: number;
    memberUserId: number;
  };

  getGroupsInvitation: {
    groupId: number;
  };

  postGroupsAcceptInvitation: {
    userEmail: string;
    token: string;
  };

  postGroupsMember: {
    groupId: number;
    userEmail: string;
  };

  getGroupsTasks: {
    groupId: number;
    date?: string;
  };
}
