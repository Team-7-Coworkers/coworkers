import { UserType } from './shared';

export interface AuthType {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export interface AuthResponseType {
  postAuthSignUp: AuthType;
  postAuthSignIn: AuthType;
  postAuthRefreshToken: {
    accessToken: string;
  };
  postAuthEasySignIn: AuthType;
}

export type SignUpFormDataType = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormDataType = {
  email: string;
  password: string;
};
