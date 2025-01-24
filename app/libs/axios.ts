import axios from 'axios';
import useUserStore from '../stores/userStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 요청 타임아웃 설정 (10초)
});

instance.interceptors.request.use(
  (config) => {
    // 브라우저 환경인지 확인 (SSR 방어 코드)
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
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // 인증 실패 처리 (로그인 페이지로 리다이렉트)
      console.error('인증 정보가 없습니다. 로그인 페이지로 이동합니다.');
      window.location.href = '/login';
    } else if (status === 403) {
      // 권한 없음
      console.error('권한이 없습니다. 관리자에게 문의하세요.');
    } else if (status === 500) {
      // 서버 에러
      console.error('서버 에러가 발생했습니다. 잠시 후 다시 시도하세요.');
    } else {
      // 기타 에러
      console.error(`Error ${status}:`, error.response?.data || error.message);
    }

    // 에러를 그대로 다음 핸들러로 전달
    return Promise.reject(error);
  }
);

export default instance;
