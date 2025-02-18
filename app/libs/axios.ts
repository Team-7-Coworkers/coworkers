import axios from 'axios';
import useUserStore from '../stores/userStore';
import useTeamStore from '../stores/teamStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-token`,
      { refreshToken }
    );

    const { accessToken } = response.data;
    setAccessToken(accessToken);

    return accessToken;
  } catch {
    clearUser();
    clearTeam();
    window.location.href = '/login';

    return null;
  }
};

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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const status = response?.status;

    if (status === 401) {
      const originalRequest = config;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
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
