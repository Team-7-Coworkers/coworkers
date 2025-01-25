export interface UserType {
  id: number;
  email: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  teamId: string;
}

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
