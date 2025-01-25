import instance from '../libs/axios';
import { GroupResponseType, GroupParamsType } from '../types/group';

// 그룹 정보 가져오기
const getGroups = async (
  params: GroupParamsType['getGroups']
): Promise<GroupResponseType['getGroups']> => {
  const { groupId } = params;
  const response = await instance.get(`groups/${groupId}`);
  return response.data;
};

// 그룹 정보 변경하기
const patchGroups = async (
  params: GroupParamsType['patchGroups']
): Promise<GroupResponseType['patchGroups']> => {
  const { groupId, image, name } = params;
  const response = await instance.patch(`groups/${groupId}`, { image, name });
  return response.data;
};

// 그룹 삭제하기
const deleteGroups = async (
  params: GroupParamsType['deleteGroups']
): Promise<void> => {
  const { groupId } = params;
  const response = await instance.delete(`groups/${groupId}`);
  return response.data;
};

// 그룹 추가하기
const postGroups = async (
  params: GroupParamsType['postGroups']
): Promise<GroupResponseType['postGroups']> => {
  const response = await instance.post(`groups`, params);
  return response.data;
};

// 그룹에 소속된 유저 조회
const getGroupsMember = async (
  params: GroupParamsType['getGroupsMember']
): Promise<GroupResponseType['getGroupsMember']> => {
  const { groupId, memberUserId } = params;
  const response = await instance.get(
    `groups/${groupId}/member/${memberUserId}`
  );
  return response.data;
};

// 그룹 멤버 삭제하기
const deleteGroupsMember = async (
  params: GroupParamsType['deleteGroupsMember']
): Promise<void> => {
  const { groupId, memberUserId } = params;
  const response = await instance.delete(
    `groups/${groupId}/member/${memberUserId}`
  );
  return response.data;
};

// 초대 링크용 토큰 생성
const getGroupsInvitation = async (
  params: GroupParamsType['getGroupsInvitation']
): Promise<GroupResponseType['getGroupsInvitation']> => {
  const { groupId } = params;
  const response = await instance.get(`groups/${groupId}/invitation`);
  return response.data;
};

// 초대 토큰으로 그룹 초대 수락하기
const postGroupsAcceptInvitation = async (
  params: GroupParamsType['postGroupsAcceptInvitation']
): Promise<GroupResponseType['postGroupsAcceptInvitation']> => {
  const response = await instance.post(`groups/accept-invitation`, params);
  return response.data;
};

// 초대 링크 없이 그룹에 유저 추가하기
const postGroupsMember = async (
  params: GroupParamsType['postGroupsMember']
): Promise<GroupResponseType['postGroupsMember']> => {
  const { groupId, userEmail } = params;
  const response = await instance.post(`groups/${groupId}/member`, {
    userEmail,
  });
  return response.data;
};

// 특정 일자, 특정 할일 리스트 가져오기
const getGroupsTasks = async (
  params: GroupParamsType['getGroupsTasks']
): Promise<GroupResponseType['getGroupsTasks']> => {
  const { groupId, date } = params;
  const response = await instance.get(`groups/${groupId}/tasks`, {
    params: date ? { date } : {},
  });
  return response.data;
};

export {
  getGroups,
  patchGroups,
  deleteGroups,
  postGroups,
  getGroupsMember,
  deleteGroupsMember,
  getGroupsInvitation,
  postGroupsAcceptInvitation,
  postGroupsMember,
  getGroupsTasks,
};
