import { GroupType, MemberShipType, TaskHistoryType, UserType } from './shared';

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
