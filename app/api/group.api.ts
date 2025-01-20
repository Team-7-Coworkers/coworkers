import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//그룹 정보 가져오기
const getGroups = async (id: number) => {
  const response = await instance.get(`groups/${id}`);
  return response.data;
};

//그룹 정보 변경하기
const patchGroups = async (id: number, image: string, name: string) => {
  const response = await instance.patch(`groups/${id}`, { image, name });
  return response.data;
};

//그룹 삭제하기
const deleteGroups = async (id: number) => {
  const response = await instance.delete(`groups/${id}`);
  return response.data;
};

//그룹 추가하기
const postGroups = async (image: string, name: string) => {
  const response = await instance.post(`groups`, { image, name });
  return response.data;
};

//그룹에 소속된 유저 조회 그룹 조회(GET /groups/:id)시, 멤버로 가입된 유저 목록도 함께 조회됨.
const getGroupsMember = async (id: number, memberUserId: number) => {
  const response = await instance.get(`groups/${id}/member/${memberUserId}`);
  return response.data;
};

//그룹 멤버 삭제하기
const deleteGroupsMember = async (id: number, memberUserId: number) => {
  const response = await instance.delete(`groups/${id}/member/${memberUserId}`);
  return response.data;
};

//초대 링크용 토큰 생성
const getGroupsInvitation = async (id: number) => {
  const response = await instance.get(`groups/${id}/invitation`);
  return response.data;
};

//GET {id}/invitation으로 생성한 토큰으로, 초대를 수락하는 엔드포인트
const postGroupsAcceptInvitation = async (userEmail: string, token: string) => {
  const response = await instance.post(`groups/accept-invitation`, {
    userEmail,
    token,
  });
  return response.data;
};

//초대 링크 없이 그룹에 유저를 추가하는 엔드포인트
const postGroupsMenber = async (id: number, userEmail: string) => {
  const response = await instance.post(`groups/${id}/member`, { userEmail });
  return response.data;
};

//특정 일자, 특정 할일 리스트의 할일 리스트 가져오기
const getGroupsTasks = async (id: number, date?: string) => {
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
  postGroupsMenber,
  getGroupsTasks,
};
