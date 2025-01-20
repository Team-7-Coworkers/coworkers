import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//회원가입
const postAuthSignUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await instance.post(`auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return response.data;
};

//로그인
const postAuthSignIn = async (email: string, password: string) => {
  const response = await instance.post(`auth/signIn`, { email, password });
  return response.data;
};

//액세스토큰 새로 받기
const postAuthRefreshToken = async (refreshToken: string) => {
  const response = await instance.post(`auth/refresh-token`, { refreshToken });
  return response.data;
};

//간편 로그인(가입되어있지 않을 경우엔 가입됩니다.)
const postAuthEasySignIn = async (
  state: string,
  redirectUri: string,
  token: string,
  provider: 'GOOGLE' | 'KAKAO'
) => {
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
