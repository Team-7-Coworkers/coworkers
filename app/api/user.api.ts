import instance from '../libs/axios';
import { UserResponseType, UserParamsType } from '@/app/types/user';

// 사용자 정보 가져오기
const getUser = async (): Promise<UserResponseType['getUser']> => {
  const response = await instance.get(`user`);
  return response.data;
};

// 사용자 정보 수정하기
const patchUser = async (
  params: UserParamsType['patchUser']
): Promise<UserResponseType['patchUser']> => {
  const response = await instance.patch(`user`, params);
  return response.data;
};

// 사용자 탈퇴하기
const deleteUser = async (): Promise<void> => {
  const response = await instance.delete(`user`);
  return response.data;
};

// 사용자 그룹 가져오기
const getUserGroups = async (): Promise<UserResponseType['getUserGroups']> => {
  const response = await instance.get(`user/groups`);
  return response.data;
};

// 사용자 멤버쉽 가져오기
const getUserMemberships = async (): Promise<
  UserResponseType['getUserMemberships']
> => {
  const response = await instance.get(`user/memberships`);
  return response.data;
};

// 사용자 완료한 작업 가져오기
const getUserHistory = async (): Promise<
  UserResponseType['getUserHistory']
> => {
  const response = await instance.get(`user/history`);
  return response.data;
};

// 비밀번호 재설정 이메일 전송하기
const postUserSendRestPasswordEmail = async (
  params: UserParamsType['postUserSendRestPasswordEmail']
): Promise<UserResponseType['postUserSendRestPasswordEmail']> => {
  const response = await instance.post(
    `user/send-reset-password-email`,
    params
  );
  return response.data;
};

// 이메일로 전달받은 링크에서 비밀번호 초기화하기
const patchUserResetPassword = async (
  params: UserParamsType['patchUserResetPassword']
): Promise<UserResponseType['patchUserResetPassword']> => {
  const response = await instance.patch(`user/reset-password`, params);
  return response.data;
};

// 사용자 비밀번호 변경 하기
const patchUserPassword = async (
  params: UserParamsType['patchUserPassword']
): Promise<UserResponseType['patchUserPassword']> => {
  const response = await instance.patch(`user/password`, params);
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
