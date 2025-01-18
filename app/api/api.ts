import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====================== User ======================

//사용자 정보 가져오기
const getUser = async () => {
  const response = await instance.get(`user`);
  return response.data;
};

//사용자 정보 수정하기
const updateUser = async (nickname: string, image: string) => {
  const response = await instance.patch(`user`, { nickname, image });
  return response.data;
};

//사용자 탈퇴하기
const deleteUser = async () => {
  const response = await instance.delete(`user`);
  return response.data;
};

//사용자 그룹 가져오기
const getUserGroups = async () => {
  const response = await instance.get(`user/groups`);
  return response.data;
};

//사용자 멤버쉽 가져오기
const getUserMemberships = async () => {
  const response = await instance.get(`user/memberships`);
  return response.data;
};

//사용자 완료한 작업 가져오기
const getUserHistory = async () => {
  const response = await instance.get(`user/history`);
  return response.data;
};

//비밀번호 재설정 이메일 전송하기
//{redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다. e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
const postUserSendRestPasswordEmail = async (
  email: string,
  redirectUrl: string
) => {
  const response = await instance.post(`user/send-reset-password-email`, {
    email,
    redirectUrl,
  });
  return response.data;
};

//이메일로 전달받은 링크에서 비밀번호 초기화하기
//POST user/send-reset-password-email 요청으로 발송한 메일의 링크에 담긴 토큰을 사용해야 합니다.
const patchUserResetPassword = async (
  passwordConfirmation: string,
  password: string,
  token: string
) => {
  const response = await instance.patch(`user/reset-password`, {
    passwordConfirmation,
    password,
    token,
  });
  return response.data;
};

//사용자 비밀번호 변경 하기
//passwordConfirmation - 확인용 비밀번호 (새 비밀번호와 동일해야 함)
//password - 새 비밀번호
const patchUserPassword = async (
  passwordConfirmation: string,
  password: string
) => {
  const response = await instance.patch(`user/password`, {
    passwordConfirmation,
    password,
  });
  return response.data;
};

// ====================== TaskList ======================

//그룹 할일 목록 가져오기
const getGroupsTaskLists = async (groupId: number, id: number) => {
  const response = await instance.get(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

//그룹 할일 목록 이름 변경하기
const patchGroupsTaskLists = async (
  name: string,
  groupId: number,
  id: number
) => {
  const response = await instance.patch(`groups/${groupId}/task-lists/${id}`, {
    name,
  });
  return response.data;
};

//그룹 할일 목록 삭제하기
const deleteGroupsTaskLists = async (groupId: number, id: number) => {
  const response = await instance.delete(`groups/${groupId}/task-lists/${id}`);
  return response.data;
};

//그룹 할일 목록 추가하기
const postGroupsTaskLists = async (name: string, groupId: number) => {
  const response = await instance.post(`groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

//그룹 할일 목록 순서 변경하기
//taskList의 displayIndex를 변경합니다. 해당 taskList가 기존 displayIndex를 버리고 넘어가면서, 그 빈 displayIndex는 "한 자리씩 당겨지는 식"으로 변경됩니다. [1,2,3,4] => (3을 0 인덱스로) => [3,1,2,4] => (4를 1 인덱스로) => [3,4,1,2]
const patchGroupsTaskListOrder = async (
  displayIndex: number,
  groupId: number,
  id: number
) => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${id}/order`,
    { displayIndex }
  );
  return response.data;
};

// ====================== Task ======================

//할 일 추가하기
const postGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  name: string,
  description: string,
  startDate: string,
  frequencyType: string,
  monthDay: number
) => {
  const response = await instance.post(
    `groups/${groupId}/task-list/${taskListId}/tasks`,
    {
      name,
      description,
      startDate,
      frequencyType,
      monthDay,
    }
  );
  return response.data;
};

//특정 일자, 특정 할일 리스트의 할일 리스트 가져오기
const getGroupsTaskListTasks = async (
  groupId: number,
  taskListId: number,
  date?: string
) => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    {
      params: date ? { date } : {}, // date가 있을 경우 쿼리 파라미터에 추가
    }
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 가져오기
const getGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number
) => {
  const response = await instance.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 수정하기
const patchGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  name: string,
  description: string,
  done: boolean
) => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done }
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 삭제하기
const deleteGroupsTaskListsTasks = async (
  groupId: number,
  taskListId: number,
  taskId: number
) => {
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

//특정 할일 목록의 할일 리스트 순서 변경하기
const patchGroupsTaskListTasksOrder = async (
  groupId: number,
  taskListId: number,
  id: number,
  displayIndex: number
) => {
  const response = await instance.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex }
  );
  return response.data;
};

//반복할 일 삭제하기
//recurringId: 반복할일 id (task 객체의 recurringId 필드, 반복설정으로 생성된 할일이 아닌, 반복설정 자체를 삭제)
const deleteGroupsTaskListsTasksRecurring = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number
) => {
  const response = await instance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`
  );
  return response.data;
};

// ====================== Recurring ======================

//반복할 일 생성하기
const postGroupsTaskListsRecurring = async (
  groupId: number,
  taskListId: number,
  name: string,
  description: string,
  startDate: string,
  frequencyType: string,
  monthDay: number
) => {
  const response = await instance.post(
    `groups/${groupId}/task-lists/${taskListId}/recurring`,
    {
      name,
      description,
      startDate,
      frequencyType,
      monthDay,
    }
  );
  return response.data;
};

// ====================== Oauth ======================

//간편 로그인 App 등록/수정하기
const postOauthApps = async (
  appSecret: string,
  appKey: string,
  provider: 'GOOGLE' | 'KAKAO'
) => {
  const response = await instance.post(`oauthApps`, {
    appSecret,
    appKey,
    provider,
  });
  return response.data;
};

// ====================== Image ======================

//이미지 업로드하기
const postImagesUpload = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await instance.post(`images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ====================== Group ======================

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

// ====================== Comment ======================

//댓글 가져오기
const getTaskComments = async (taskId: number) => {
  const response = await instance.get(`tasks/${taskId}/comments`);
  return response.data;
};

//댓글 보내기
const postTasksComments = async (taskId: number, Content: string) => {
  const response = await instance.post(`tasks/${taskId}/comments`, { Content });
  return response.data;
};

//댓글 수정하기
const patchTasksComments = async (
  taskId: number,
  commentId: number,
  Content: string
) => {
  const response = await instance.patch(
    `tasks/${taskId}/comments/${commentId}`,
    { Content }
  );
  return response.data;
};

//댓글 삭제하기
const deleteTasksComments = async (taskId: number, commentId: number) => {
  const response = await instance.delete(
    `tasks/${taskId}/comments/${commentId}`
  );
  return response.data;
};

// ====================== Auth ======================

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

// ====================== ArticleComment ======================

//게시글의 댓글 작성하기
const postArticlesComments = async (articleId: number, content: string) => {
  const response = await instance.post(`articles/${articleId}/comments`, {
    content,
  });
  return response.data;
};

// 게시글의 댓글 목록 조회하기
const getArticlesComment = async (
  articleId: number,
  limit: number,
  cursor?: number
) => {
  const response = await instance.get(`articles/${articleId}/comments`, {
    params: {
      limit,
      ...(cursor && { cursor }),
    },
  });
  return response.data;
};

//게시글의 댓글 수정하기
const patchComments = async (commentId: number, content: string) => {
  const response = await instance.patch(`comments/${commentId}`, { content });
  return response.data;
};

//게시글의 댓글 삭제하기
const deleteComments = async (commentId: number) => {
  const response = await instance.patch(`comments/${commentId}`);
  return response.data;
};

// ====================== Article ======================

//게시글 올리기
const postArticles = async (image: string, content: string, title: string) => {
  const response = await instance.post(`articles`, { image, content, title });
  return response.data;
};

// 게시글 목록 조회하기
const getArticles = async (
  page: number = 1,
  pageSize: number = 6,
  orderBy: string = 'recent',
  keyword: string = ''
) => {
  const response = await instance.get(`articles`, {
    params: {
      page,
      pageSize,
      orderBy,
      keyword, //검색 키워드
    },
  });
  return response.data;
};

//게시글 상세 조회하기
const getDetailsArticle = async (articleId: number) => {
  const response = await instance.get(`articles/${articleId}`);
  return response.data;
};

//게시글 수정하기
const patchArticles = async (
  articleId: number,
  image: string,
  content: string,
  title: string
) => {
  const response = await instance.patch(`articles/${articleId}`, {
    image,
    content,
    title,
  });
  return response.data;
};

//게시글 삭제하기
const deleteArticles = async (articleId: number) => {
  const response = await instance.delete(`articles/${articleId}`);
  return response.data;
};

//게시글 좋아요 달기
const postArticlesLike = async (articleId: number) => {
  const response = await instance.post(`articles/${articleId}/like`);
  return response.data;
};

//게시글 좋아요 취소하기
const deleteArticlesLike = async (articleId: number) => {
  const response = await instance.delete(`articles/${articleId}/like`);
  return response.data;
};

export {
  getUser,
  updateUser,
  deleteUser,
  getUserGroups,
  getUserMemberships,
  getUserHistory,
  postUserSendRestPasswordEmail,
  patchUserResetPassword,
  patchUserPassword,
  getGroupsTaskLists,
  patchGroupsTaskLists,
  deleteGroupsTaskLists,
  postGroupsTaskLists,
  patchGroupsTaskListOrder,
  postGroupsTaskListsTasks,
  getGroupsTaskListTasks,
  getGroupsTaskListsTasks,
  patchGroupsTaskListsTasks,
  deleteGroupsTaskListsTasks,
  patchGroupsTaskListTasksOrder,
  deleteGroupsTaskListsTasksRecurring,
  postGroupsTaskListsRecurring,
  postOauthApps,
  postImagesUpload,
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
  getTaskComments,
  postTasksComments,
  patchTasksComments,
  deleteTasksComments,
  postAuthSignUp,
  postAuthSignIn,
  postAuthRefreshToken,
  postAuthEasySignIn,
  postArticlesComments,
  getArticlesComment,
  patchComments,
  deleteComments,
  postArticles,
  getArticles,
  getDetailsArticle,
  patchArticles,
  deleteArticles,
  postArticlesLike,
  deleteArticlesLike,
};
