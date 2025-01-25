import { TaskType } from './task';
import { MemberShipType } from './user';

export interface GroupType {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

export interface GroupDataType extends GroupType {
  members: MemberShipType[];
  taskLists: Omit<TaskType, 'doneBy', 'writer'>[];
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
