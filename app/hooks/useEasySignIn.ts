'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '@/app/api/auth.api';
import useUserStore from '@/app/stores/userStore';
import { createErrorHandler } from '../utils/createErrorHandler';

type ProviderType = 'GOOGLE' | 'KAKAO';

export interface EasySignInPayload {
  token: string;
  provider: 'GOOGLE' | 'KAKAO';
  state?: string;
  redirectUri?: string;
}

export const useEasySignIn = ({ provider }: { provider: ProviderType }) => {
  const router = useRouter();
  const {
    setAccessToken,
    setRefreshToken,
    setUser,
    setIsKakaoLogin,
    setIsGoogleLogin,
  } = useUserStore();

  return useMutation({
    mutationFn: postAuthEasySignIn,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      if (provider === 'GOOGLE') {
        setIsGoogleLogin(true);
      } else if (provider === 'KAKAO') {
        setIsKakaoLogin(true);
      }

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
