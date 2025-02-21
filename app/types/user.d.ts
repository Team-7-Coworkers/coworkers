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

export interface UserParamsType {
  patchUser: {
    nickname?: string;
    image?: string;
  };

  postUserSendRestPasswordEmail: {
    email: string;
    redirectUrl: string;
  };

  patchUserResetPassword: {
    passwordConfirmation: string;
    password: string;
    token: string;
  };

  patchUserPassword: {
    passwordConfirmation: string;
    password: string;
  };
}
