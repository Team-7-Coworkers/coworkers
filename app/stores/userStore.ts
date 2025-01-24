import { create } from 'zustand';

interface UserState {
  user: { nickname: string; email: string } | null; // 사용자 정보 (이름과 이메일)
  accessToken: string | null; // 인증 토큰
  setUser: (user: { nickname: string; email: string }) => void; // 사용자 정보를 설정
  setToken: (token: string) => void; // 인증 토큰을 설정하는 함수
  clearUser: () => void; // 사용자 정보를 초기화하는 함수
}

const useUserStore = create<UserState>((set) => ({
  user: null, // 초기 사용자 정보는 null
  accessToken:
    typeof window !== 'undefined'
      ? localStorage.getItem('coworkers_access_token')
      : null,
  // 초기 인증 토큰 설정: 클라이언트 환경에서 localStorage에서 가져옴

  setUser: (user) => set({ user }),
  // 사용자 정보를 상태에 저장하는 함수

  setToken: (token) => {
    if (token) {
      // 토큰이 존재하면 localStorage에 저장
      localStorage.setItem('coworkers_access_token', token);
    } else {
      // 토큰이 없으면 localStorage에서 삭제
      localStorage.removeItem('coworkers_access_token');
    }
    set({ accessToken: token }); // 상태에 토큰 업데이트
  },

  clearUser: () => {
    // 사용자 정보를 초기화하는 함수
    localStorage.removeItem('coworkers_access_token'); // localStorage에서 토큰 삭제
    set({ user: null, accessToken: null }); // 상태 초기화
  },
}));

export default useUserStore;

// 사용 예시
// const { user, token, setUser, setToken, clearUser } = useUserStore();
