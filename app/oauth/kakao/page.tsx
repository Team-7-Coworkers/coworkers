'use client';

import { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';

const KakaoCallback = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const easySignInMutation = useEasySignIn();

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
    if (isProcessing) return;

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const receivedState = urlParams.get('state');
    const storedState = localStorage.getItem('kakao_state');

    if (!code) {
      toast.error('⚠️ 인가 코드가 없습니다. 다시 로그인해주세요.');

      return;
    }

    if (!receivedState || receivedState !== storedState) {
      toast.error('⚠️ CSRF 공격이 감지되었습니다. 다시 로그인해주세요.');

      return;
    }

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing]);

  return <EasyLoginLoadingPage type="kakao" />;
};

export default KakaoCallback;
