'use client';

import React, { useState } from 'react';

import { postAuthSignUp, postAuthSignIn } from '../api/auth.api';
// import { getUser } from '../api/user.api';
import {
  getGroups,
  postGroups,
  patchGroups,
  deleteGroups,
  getGroupsMember,
  postGroupsMember,
} from '../api/group.api';
import axios from 'axios';
import {
  postArticles,
  getArticles,
  patchArticles,
  deleteArticles,
} from '../api/article.api';
// import { postGroupsTaskLists, getGroupsTaskLists } from '../api/taskList.api';
// import { postTasksComments, getTaskComments } from '../api/comment.api';
// import { updateUser } from '../api/user.api';
// import {
//   AuthResponse,
//   UserResponse,
//   GroupResponse,
//   CommentResponse,
//   GroupDetailResponse,
// } from '../api/apiTypes'; // 타입 import

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header Added:', config.headers.Authorization);
  } else {
    console.warn('No accessToken found in localStorage');
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized:', error.response.data);
    }
    return Promise.reject(error);
  }
);

const AuthTestPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null); // API 응답 저장
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [groupId, setGroupId] = useState<number | null>(null); // 추가된 그룹 ID 저장
  const [articleId, setArticleId] = useState<number | null>(null); // 추가된 게시글 ID 저장

  // API 호출 함수
  const handleApiCall = async (
    apiFunc: (args: any) => Promise<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    args: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    try {
      setLoading(true); // 로딩 시작
      const res = await apiFunc(args); // API 호출
      setResponse(res); // 응답 저장

      // 그룹 추가 시 ID 저장
      if (apiFunc === postGroups) {
        setGroupId(res.id); // 추가된 그룹 ID 저장
        console.log('새 그룹 ID:', res.id);
      }

      // 게시글 추가 시 ID 저장
      if (apiFunc === postArticles) {
        setArticleId(res.id); // 추가된 게시글 ID 저장
        console.log('새 게시글 ID:', res.id);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('API 호출 에러:', error);
      setResponse(error.response?.data || 'Error occurred');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 로그인된 이메일로 그룹에 유저 추가
  const handleAddMember = async () => {
    const userEmail = localStorage.getItem('userEmail'); // 로그인된 이메일 가져오기
    if (!userEmail) {
      alert('로그인된 이메일이 없습니다. 먼저 로그인하세요.');
      return;
    }
    if (!groupId) {
      alert('먼저 그룹을 추가하세요.');
      return;
    }

    try {
      setLoading(true);
      const res = await postGroupsMember({ id: groupId, userEmail });
      console.log('멤버 추가 성공:', res);
      setResponse(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('멤버 추가 에러:', error);
      setResponse(error.response?.data || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>회원가입 및 로그인 테스트</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* 회원가입 */}
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            handleApiCall(postAuthSignUp, {
              email: 'tes4444t@example.com',
              nickname: 'nickname12345',
              password: 'password12156@',
              passwordConfirmation: 'password12156@',
            })
          }
        >
          회원가입
        </button>

        {/* 로그인 */}
        <button
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px',
          }}
          onClick={async () => {
            const res = await postAuthSignIn({
              email: 'test@example.com',
              password: 'password1215@',
            });
            localStorage.setItem('accessToken', res.accessToken); // 토큰 저장
            localStorage.setItem('userEmail', res.email); // 이메일 저장
            console.log('로그인 성공, 받은 토큰:', res.accessToken);
            setResponse(res);
          }}
        >
          로그인
        </button>

        {/* 그룹 추가하기 */}
        <button
          style={{
            backgroundColor: '#673AB7',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            handleApiCall(postGroups, {
              image: 'https://example.com/image.png',
              name: 'Test Group',
            })
          }
        >
          그룹 추가하기
        </button>

        {/* 로그인된 메일로 그룹에 추가하기 */}
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
          }}
          onClick={handleAddMember}
        >
          로그인된 메일로 그룹에 추가하기
        </button>

        {/* 그룹 정보 가져오기 */}
        <button
          style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            groupId
              ? handleApiCall(getGroups, { id: groupId })
              : alert('먼저 그룹을 추가하세요.')
          }
        >
          그룹 정보 가져오기
        </button>

        {/* 그룹 정보 수정하기 */}
        <button
          style={{
            backgroundColor: '#E91E63',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            groupId
              ? handleApiCall(patchGroups, {
                  id: groupId,
                  image: 'https://example.com/new-image.png',
                  name: 'Updated Group Name',
                })
              : alert('먼저 그룹을 추가하세요.')
          }
        >
          그룹 정보 수정하기
        </button>

        {/* 그룹 삭제하기 */}
        <button
          style={{
            backgroundColor: '#F44336',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            groupId
              ? handleApiCall(deleteGroups, { id: groupId })
              : alert('먼저 그룹을 추가하세요.')
          }
        >
          그룹 삭제하기
        </button>

        {/* 그룹 멤버 조회 */}
        <button
          style={{
            backgroundColor: '#009688',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            groupId
              ? handleApiCall(getGroupsMember, { id: groupId, memberUserId: 1 })
              : alert('먼저 그룹을 추가하세요.')
          }
        >
          그룹 멤버 조회
        </button>
        {/* 게시글 올리기 */}
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            handleApiCall(postArticles, {
              image:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1314/images.jpg',
              content: 'This is a test article.',
              title: 'Test Article',
            })
          }
        >
          게시글 올리기
        </button>

        {/* 게시글 목록 조회 */}
        <button
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            handleApiCall(getArticles, {
              page: 1,
              pageSize: 6,
              orderBy: 'recent',
              keyword: '',
            })
          }
        >
          게시글 목록 조회
        </button>

        {/* 게시글 수정하기 */}
        <button
          style={{
            backgroundColor: '#E91E63',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            articleId
              ? handleApiCall(patchArticles, {
                  articleId,
                  image: 'https://example.com/new-image.png',
                  content: 'This is updated content.',
                  title: 'Updated Title',
                })
              : alert('먼저 게시글을 올려주세요.')
          }
        >
          게시글 수정하기
        </button>

        {/* 게시글 삭제하기 */}
        <button
          style={{
            backgroundColor: '#F44336',
            color: 'white',
            padding: '10px',
          }}
          onClick={() =>
            articleId
              ? handleApiCall(deleteArticles, { articleId })
              : alert('먼저 게시글을 올려주세요.')
          }
        >
          게시글 삭제하기
        </button>
      </div>

      {/* 로딩 표시 */}
      {loading && <p>로딩 중...</p>}

      {/* API 응답 데이터 표시 */}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>API 응답 결과:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthTestPage;
