import instance from '../libs/axios';
import { OauthResponseType, OauthParamsType } from '../types/oauth';

// 간편 로그인 App 등록/수정하기
const postOauthApps = async (
  params: OauthParamsType['postOauthApps']
): Promise<OauthResponseType> => {
  const response = await instance.post(`oauthApps`, params);
  return response.data;
};

export { postOauthApps };
