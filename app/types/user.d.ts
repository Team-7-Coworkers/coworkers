import { UserType } from './auth';
import { GroupType } from './group';
import { TaskHistoryType } from './task';

type Role = 'ADMIN' | 'MEMBER';

export interface MemberShipType {
  group: GroupType;
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface UserDataType extends UserType {
  memberships: MemberShipType[];
}

export interface UserResponseType {
  getUser: UserDataType;
  patchUser: {
    message: string;
  };
  getUserGroups: GroupType[];
  getUserMemberships: MemberShipType[];
  getUserHistory: {
    tasksDone: TaskHistoryType[];
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
