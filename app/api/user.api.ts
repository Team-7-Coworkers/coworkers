import axios from 'axios';
import { userResponseType } from '@/app/types/user';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용자 정보 가져오기
const getUser = async (): Promise<userResponseType['getUser']> => {
  const response = await instance.get(`user`);
  return response.data;
};

// 사용자 정보 수정하기
const patchUser = async ({
  nickname,
  image,
}: {
  nickname: string;
  image: string;
}): Promise<userResponseType['patchUser']> => {
  const response = await instance.patch(`user`, { nickname, image });
  return response.data;
};

// 사용자 탈퇴하기
const deleteUser = async () => {
  const response = await instance.delete(`user`);
  return response.data;
};

// 사용자 그룹 가져오기
const getUserGroups = async (): Promise<userResponseType['getUserGroups']> => {
  const response = await instance.get(`user/groups`);
  return response.data;
};

// 사용자 멤버쉽 가져오기
const getUserMemberships = async (): Promise<
  userResponseType['getUserMemberships']
> => {
  const response = await instance.get(`user/memberships`);
  return response.data;
};

// 사용자 완료한 작업 가져오기
const getUserHistory = async (): Promise<
  userResponseType['getUserHistory']
> => {
  const response = await instance.get(`user/history`);
  return response.data;
};

// 비밀번호 재설정 이메일 전송하기
// {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다. e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
const postUserSendRestPasswordEmail = async ({
  email,
  redirectUrl,
}: {
  email: string;
  redirectUrl: string;
}): Promise<userResponseType['postUserSendRestPasswordEmail']> => {
  const response = await instance.post(`user/send-reset-password-email`, {
    email,
    redirectUrl,
  });
  return response.data;
};

// 이메일로 전달받은 링크에서 비밀번호 초기화하기
// POST user/send-reset-password-email 요청으로 발송한 메일의 링크에 담긴 토큰을 사용해야 합니다.
const patchUserResetPassword = async ({
  passwordConfirmation,
  password,
  token,
}: {
  passwordConfirmation: string;
  password: string;
  token: string;
}): Promise<userResponseType['patchUserResetPassword']> => {
  const response = await instance.patch(`user/reset-password`, {
    passwordConfirmation,
    password,
    token,
  });
  return response.data;
};

// 사용자 비밀번호 변경 하기
// passwordConfirmation - 확인용 비밀번호 (새 비밀번호와 동일해야 함)
// password - 새 비밀번호
const patchUserPassword = async ({
  passwordConfirmation,
  password,
}: {
  passwordConfirmation: string;
  password: string;
}): Promise<userResponseType['patchUserPassword']> => {
  const response = await instance.patch(`user/password`, {
    passwordConfirmation,
    password,
  });
  return response.data;
};

export {
  getUser,
  patchUser,
  deleteUser,
  getUserGroups,
  getUserMemberships,
  getUserHistory,
  postUserSendRestPasswordEmail,
  patchUserResetPassword,
  patchUserPassword,
};
