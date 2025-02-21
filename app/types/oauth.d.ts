export interface OauthResponseType {
  createdAt: string;
  updatedAt: string;
  appSecret: string;
  appKey: string;
  provider: 'GOOGLE';
  teamId: string;
  id: number;
}

export interface OauthParamsType {
  postOauthApps: {
    appSecret: string;
    appKey: string;
    provider: 'GOOGLE' | 'KAKAO';
  };
}
