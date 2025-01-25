import instance from '../libs/axios';
import { AuthResponseType, AuthParamsType } from '../types/auth';

// 회원가입
const postAuthSignUp = async (
  params: AuthParamsType['postAuthSignUp']
): Promise<AuthResponseType['postAuthSignUp']> => {
  const response = await instance.post(`auth/signUp`, params);
  return response.data;
};

// 로그인
const postAuthSignIn = async (
  params: AuthParamsType['postAuthSignIn']
): Promise<AuthResponseType['postAuthSignIn']> => {
  const response = await instance.post(`auth/signIn`, params);
  console.log(response.data);
  return response.data;
};

// 액세스토큰 새로 받기
const postAuthRefreshToken = async (
  params: AuthParamsType['postAuthRefreshToken']
): Promise<AuthResponseType['postAuthRefreshToken']> => {
  const response = await instance.post(`auth/refresh-token`, params);
  return response.data;
};

// 간편 로그인 (가입되어있지 않을 경우엔 가입됩니다.)
const postAuthEasySignIn = async (
  params: AuthParamsType['postAuthEasySignIn']
): Promise<AuthResponseType['postAuthEasySignIn']> => {
  const { state, redirectUri, token, provider } = params;
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
