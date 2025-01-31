import axios from 'axios';
import useUserStore from '../stores/userStore';
import useTeamStore from '../stores/teamStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 요청 타임아웃 설정 (10초)
});

// 토큰 갱신 함수
const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken, clearUser, setAccessToken } = useUserStore.getState();
  const { clearTeam } = useTeamStore.getState();

  if (!refreshToken) {
    console.warn('리프레쉬 토큰이 없습니다. 로그아웃 처리합니다.');
    clearUser();
    clearTeam();
    window.location.href = '/login';

    return null;
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken }
    );

    const { accessToken } = response.data;
    setAccessToken(accessToken); // 새로운 액세스 토큰 저장

    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    alert('인증이 만료되었습니다. 다시 로그인해주세요.');
    clearUser(); // 상태 초기화
    clearTeam();
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트

    return null;
  }
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const { accessToken } = useUserStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);

    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const status = response?.status;

    // 인증 실패: 토큰 만료 가능성
    if (status === 401) {
      const originalRequest = config;

      if (!originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그 설정

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest); // 새 토큰으로 요청 재시도
        }
      }
    } else if (status === 403) {
      console.error('권한이 없습니다. 관리자에게 문의하세요.');
    } else if (status === 500) {
      console.error('서버 에러가 발생했습니다. 잠시 후 다시 시도하세요.');
    } else if (!response) {
      console.error('네트워크 에러 또는 서버와의 연결이 끊어졌습니다.');
    } else {
      console.error(`Error ${status}:`, response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
