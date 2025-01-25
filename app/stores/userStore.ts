'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

interface UserState {
  user: UserInfo | null;
  accessToken: string | null; // 액세스 토큰
  refreshToken: string | null; // 리프레쉬 토큰 추가
  setUser: (user: UserInfo) => void; // 사용자 정보를 설정
  setAccessToken: (accessToken: string) => void; // 엑세스 토큰 설정
  setRefreshToken: (refreshToken: string) => void; // 리프레쉬 토큰 설정
  clearUser: () => void; // 사용자 정보와 토큰을 초기화
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null, // 초기값 추가
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      clearUser: () =>
        set({ user: null, accessToken: null, refreshToken: null }), // 초기화
    }),
    {
      name: 'coworkers-storage', // 로컬 스토리지 키
    }
  )
);

export default useUserStore;
