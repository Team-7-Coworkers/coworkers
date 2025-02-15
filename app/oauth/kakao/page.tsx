'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';
import { useRouter } from 'next/navigation';

const KakaoCallback = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const easySignInMutation = useEasySignIn({ provider: 'KAKAO' });

  const router = useRouter();
  const hasShownError = useRef(false);

  const handleKakaoLogin = useCallback(
    async (code: string, receivedState: string) => {
      setIsProcessing(true);

      const data = await easySignInMutation.mutateAsync({
        token: code,
        provider: 'KAKAO',
        state: receivedState,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
      });

      if (data.user?.nickname && /^\d+$/.test(data.user.nickname)) {
        toast.warn(
          '카카오 임시 닉네임을 사용중입니다. 계정 설정에서 닉네임을 변경해주세요!'
        );
      }
    },
    [easySignInMutation]
  );

  useEffect(() => {
    if (isProcessing || hasShownError.current) return;

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const receivedState = urlParams.get('state');
    const storedState = localStorage.getItem('kakao_state');

    const redirectWithMessage = (message: string, error = true) => {
      if (error) {
        toast.error(message);
      } else {
        toast(message);
      }
      hasShownError.current = true;
      router.push('/login');
    };

    if (!code) {
      redirectWithMessage(
        '⚠️ 인가 코드가 없습니다. 카카오톡 간편 로그인을 다시 진행해주세요.'
      );
      return;
    }

    if (!storedState) {
      redirectWithMessage(
        '카카오 브라우저로 접속하셨습니다. 카카오 로그인을 다시 진행해주세요.',
        false
      );
      return;
    }

    if (receivedState !== storedState) {
      redirectWithMessage(
        '⚠️ CSRF 공격이 감지되었습니다. 카카오톡 간편 로그인을 다시 진행해주세요.'
      );
      return;
    }

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing, router]);

  return <EasyLoginLoadingPage type="kakao" />;
};

export default KakaoCallback;
