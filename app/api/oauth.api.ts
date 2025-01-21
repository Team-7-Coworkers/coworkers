import axios from 'axios';
import { oauthResponseType } from '../types/oauth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 간편 로그인 App 등록/수정하기
const postOauthApps = async ({
  appSecret,
  appKey,
  provider,
}: {
  appSecret: string;
  appKey: string;
  provider: 'GOOGLE' | 'KAKAO';
}): Promise<oauthResponseType> => {
  const response = await instance.post(`oauthApps`, {
    appSecret,
    appKey,
    provider,
  });
  return response.data;
};

export { postOauthApps };
