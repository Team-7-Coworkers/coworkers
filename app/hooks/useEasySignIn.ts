'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '@/app/api/auth.api';
import useUserStore from '@/app/stores/userStore';
import axios from 'axios';

export interface EasySignInPayload {
  token: string;
  provider: 'GOOGLE' | 'KAKAO';
  state?: string;
  redirectUri?: string;
}

export const useEasySignIn = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUser } = useUserStore();

  return useMutation({
    mutationFn: postAuthEasySignIn,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      router.push('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`간편 로그인 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      router.push('/login');
    },
  });
};
