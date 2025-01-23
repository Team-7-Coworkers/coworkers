import instance from '../libs/axios';
import { authResponseType } from '../types/auth';

// 회원가입
const postAuthSignUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}): Promise<authResponseType['postAuthSignUp']> => {
  const response = await instance.post(`auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return response.data;
};

// 로그인
const postAuthSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<authResponseType['postAuthSignIn']> => {
  const response = await instance.post(`auth/signIn`, { email, password });
  return response.data;
};

// 액세스토큰 새로 받기
const postAuthRefreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<authResponseType['postAuthRefreshToken']> => {
  const response = await instance.post(`auth/refresh-token`, { refreshToken });
  return response.data;
};

// 간편 로그인(가입되어있지 않을 경우엔 가입됩니다.)
const postAuthEasySignIn = async ({
  state,
  redirectUri,
  token,
  provider,
}: {
  state: string;
  redirectUri: string;
  token: string;
  provider: 'GOOGLE' | 'KAKAO';
}): Promise<authResponseType['postAuthEasySignIn']> => {
  const response = await instance.post(`auth/singIn/${provider}`, {
    state,
    redirectUri,
    token,
  });
  return response.data;
};

export {
  postAuthSignUp,
  postAuthSignIn,
  postAuthRefreshToken,
  postAuthEasySignIn,
};
