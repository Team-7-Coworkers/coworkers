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

export interface AuthParamsType {
  postAuthSignUp: {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  };

  postAuthSignIn: {
    email: string;
    password: string;
  };

  postAuthRefreshToken: {
    refreshToken: string;
  };

  postAuthEasySignIn: {
    state?: string | null;
    redirectUri?: string | null;
    token: string;
    provider: 'GOOGLE' | 'KAKAO';
  };
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
