export interface authResponseType {
  postAuthSignUp: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      nickname: string;
      updatedAt: string;
      createdAt: string;
      image: string | null;
      teamId: string;
    };
  };
  postAuthSignIn: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      nickname: string;
      updatedAt: string;
      createdAt: string;
      image: string | null;
      teamId: string;
    };
  };
  postAuthRefreshToken: {
    accessToken: string;
  };
  postAuthEasySignIn: {
    refreshToken: string;
    accessToken: string;
    user: {
      teamId: string;
      image: string;
      updatedAt: string;
      createdAt: string;
      nickname: string;
      id: number;
      email: string;
    };
  };
}

export type SignUpFormDataType = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginformDataType = {
  email: string;
  password: string;
};
