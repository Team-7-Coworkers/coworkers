'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  teamId: string;
}

interface UserState {
  user: UserInfo | null;
  accessToken: string | null; // 액세스 토큰
  refreshToken: string | null; // 리프레쉬 토큰 추가
  isGoogleLogin: boolean | null; // 구글 간편 로그인 여부
  isKakaoLogin: boolean | null; // 카카오 간편 로그인 여부
  setUser: (user: UserInfo) => void; // 사용자 정보를 설정
  updateUser: (data: Partial<UserInfo>) => void; // 사용자 정보 업데이트
  setAccessToken: (accessToken: string) => void; // 엑세스 토큰 설정
  setRefreshToken: (refreshToken: string) => void; // 리프레쉬 토큰 설정
  setIsGoogleLogin: (isGoogleLogin: boolean) => void;
  setIsKakaoLogin: (isKakaoLogin: boolean) => void;
  clearUser: () => void; // 사용자 정보와 토큰을 초기화
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null, // 초기값 추가
      isGoogleLogin: false,
      isKakaoLogin: false,
      setUser: (user) => set({ user }),
      updateUser: (data: Partial<UserInfo>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : state.user,
        })),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setIsGoogleLogin: (isGoogleLogin) => set({ isGoogleLogin }),
      setIsKakaoLogin: (isKakaoLogin) => set({ isKakaoLogin }),
      clearUser: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isGoogleLogin: false,
          isKakaoLogin: false,
        }), // 초기화
    }),
    {
      name: 'coworkers-storage', // 로컬 스토리지 키
    }
  )
);

export default useUserStore;
