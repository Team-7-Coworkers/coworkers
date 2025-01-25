import instance from '../libs/axios';
import { GroupResponseType } from '../types/group';

// 그룹 정보 가져오기
const getGroups = async ({
  id,
}: {
  id: number;
}): Promise<GroupResponseType['getGroups']> => {
  const response = await instance.get(`groups/${id}`);
  return response.data;
};

// 그룹 정보 변경하기
const patchGroups = async ({
  id,
  image,
  name,
}: {
  id: number;
  image: string;
  name: string;
}): Promise<GroupResponseType['patchGroups']> => {
  const response = await instance.patch(`groups/${id}`, { image, name });
  return response.data;
};

// 그룹 삭제하기
const deleteGroups = async ({ id }: { id: number }) => {
  const response = await instance.delete(`groups/${id}`);
  return response.data;
};

// 그룹 추가하기
const postGroups = async ({
  image,
  name,
}: {
  image: string;
  name: string;
}): Promise<GroupResponseType['postGroups']> => {
  const response = await instance.post(`groups`, { image, name });
  return response.data;
};

// 그룹에 소속된 유저 조회
const getGroupsMember = async ({
  id,
  memberUserId,
}: {
  id: number;
  memberUserId: number;
}): Promise<GroupResponseType['getGroupsMember']> => {
  const response = await instance.get(`groups/${id}/member/${memberUserId}`);
  return response.data;
};

// 그룹 멤버 삭제하기
const deleteGroupsMember = async ({
  id,
  memberUserId,
}: {
  id: number;
  memberUserId: number;
}) => {
  const response = await instance.delete(`groups/${id}/member/${memberUserId}`);
  return response.data;
};

// 초대 링크용 토큰 생성
const getGroupsInvitation = async ({
  id,
}: {
  id: number;
}): Promise<GroupResponseType['getGroupsInvitation']> => {
  const response = await instance.get(`groups/${id}/invitation`);
  return response.data;
};

// 초대 토큰으로 그룹 초대 수락하기
const postGroupsAcceptInvitation = async ({
  userEmail,
  token,
}: {
  userEmail: string;
  token: string;
}): Promise<GroupResponseType['postGroupsAcceptInvitation']> => {
  const response = await instance.post(`groups/accept-invitation`, {
    userEmail,
    token,
  });
  return response.data;
};

// 초대 링크 없이 그룹에 유저 추가하기
const postGroupsMember = async ({
  id,
  userEmail,
}: {
  id: number;
  userEmail: string;
}): Promise<GroupResponseType['postGroupsMember']> => {
  const response = await instance.post(`groups/${id}/member`, { userEmail });
  return response.data;
};

// 특정 일자, 특정 할일 리스트 가져오기
const getGroupsTasks = async ({
  id,
  date,
}: {
  id: number;
  date?: string;
}): Promise<GroupResponseType['getGroupsTasks']> => {
  const response = await instance.get(`groups/${id}/tasks`, {
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
