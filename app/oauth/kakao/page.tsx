'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '../../api/auth.api';
import useUserStore from '@/app/stores/userStore';

const KakaoCallback = () => {
  const router = useRouter();

  const { setAccessToken, setRefreshToken, setUser } = useUserStore();

  const [isProcessing, setIsProcessing] = useState(false);

  // 카카오 로그인 API 요청
  const kakaoLoginMutation = useMutation({
    mutationFn: postAuthEasySignIn,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      alert('카카오 로그인 성공!');

      router.push('/');
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
      alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
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
    if (isProcessing) return; // 이미 처리 중이라면 실행하지 않음

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code'); // 카카오에서 전달한 인가 코드
    const receivedState = urlParams.get('state'); // 응답에서 받은 state 값
    const storedState = localStorage.getItem('kakao_state'); // 로컬 스토리지에 저장된 state 값 가져오기

    if (!code) {
      alert('⚠️ 인가 코드가 없습니다. 다시 로그인해주세요.');
      return;
    }

    if (!receivedState || receivedState !== storedState) {
      alert('⚠️ CSRF 공격이 감지되었습니다. 다시 로그인해주세요.');
      return;
    }

    setIsProcessing(true);

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
