import instance from '../libs/axios';
import { OauthResponseType } from '../types/oauth';

// 간편 로그인 App 등록/수정하기
const postOauthApps = async ({
  appSecret,
  appKey,
  provider,
}: {
  appSecret: string;
  appKey: string;
  provider: 'GOOGLE' | 'KAKAO';
}): Promise<OauthResponseType> => {
  const response = await instance.post(`oauthApps`, {
    appSecret,
    appKey,
    provider,
  });
  return response.data;
};

export { postOauthApps };
