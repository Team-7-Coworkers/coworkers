'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';
import { useRouter } from 'next/navigation';

const KakaoCallback = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const easySignInMutation = useEasySignIn();

  const router = useRouter();
  const hasShownError = useRef(false);

  const handleKakaoLogin = useCallback(
    (code: string, receivedState: string) => {
      setIsProcessing(true);
      easySignInMutation.mutate({
        token: code,
        provider: 'KAKAO',
        state: receivedState,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
      });
    },
    [easySignInMutation]
  );

  useEffect(() => {
    if (isProcessing || hasShownError.current) return;

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const receivedState = urlParams.get('state');
    const storedState = localStorage.getItem('kakao_state');

    if (!code) {
      toast.error(
        '⚠️ 인가 코드가 없습니다. 카카오톡 간편 로그인을 다시 진행해주세요.'
      );
      hasShownError.current = true;

      router.push('/login');
      return;
    }

    if (!receivedState || receivedState !== storedState) {
      toast.error(
        '⚠️ CSRF 공격이 감지되었습니다. 카카오톡 간편 로그인을 다시 진행해주세요.'
      );

      hasShownError.current = true;
      router.push('/login');
      return;
    }

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing, router]);

  return <EasyLoginLoadingPage type="kakao" />;
};

export default KakaoCallback;
