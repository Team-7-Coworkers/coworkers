'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '@/app/api/auth.api';
import useUserStore from '@/app/stores/userStore';
import { createErrorHandler } from '../utils/createErrorHandler';

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
    onError: createErrorHandler({
      prefixMessage: '간편 로그인 실패',
      onAfter: () => {
        router.push('/login');
      },
    }),
  });
};
