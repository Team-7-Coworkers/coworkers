'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '../../api/auth.api';
import useUserStore from '@/app/stores/userStore';
import EasyLoginLoadingPage from '../EasyLoginLoadingPage';
import axios from 'axios';

const KakaoCallback = () => {
  const router = useRouter();

  const { setAccessToken, setRefreshToken, setUser } = useUserStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const kakaoLoginMutation = useMutation({
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

  const handleKakaoLogin = useCallback(
    (code: string, receivedState: string) => {
      setIsProcessing(true);

      kakaoLoginMutation.mutate({
        state: receivedState,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
        token: code,
        provider: 'KAKAO',
      });
    },
    [kakaoLoginMutation]
  );

  useEffect(() => {
    if (isProcessing) return;

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const receivedState = urlParams.get('state');
    const storedState = localStorage.getItem('kakao_state');

    if (!code) {
      alert('⚠️ 인가 코드가 없습니다. 다시 로그인해주세요.');
      router.push('/login');

      return;
    }

    if (!receivedState || receivedState !== storedState) {
      alert('⚠️ CSRF 공격이 감지되었습니다. 다시 로그인해주세요.');
      router.push('/login');

      return;
    }

    setIsProcessing(true);

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing, router]);

  return <EasyLoginLoadingPage type="kakao" />;
};

export default KakaoCallback;
