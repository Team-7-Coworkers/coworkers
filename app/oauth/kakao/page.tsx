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
    const isKakaoBrowser = /KAKAOTALK/i.test(navigator.userAgent);

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
        '카카오톡 인증에 실패했습니다. 정상적인 경로로 다시 접근해주세요.'
      );

      return;
    }

    const validDuration = 15 * 1000; // 15초
    let storedStateObj: { value: string; timestamp: number } | null = null;

    try {
      storedStateObj = storedState ? JSON.parse(storedState) : null;
    } catch {
      storedStateObj = null;
    }

    if (isKakaoBrowser) {
      if (
        !storedStateObj ||
        Date.now() - storedStateObj.timestamp > validDuration
      ) {
        redirectWithMessage(
          '카카오 브라우저로 접속하셨습니다. 카카오 로그인을 다시 진행해주세요.',
          false
        );

        return;
      }
    }

    if (!receivedState || receivedState !== storedStateObj?.value) {
      redirectWithMessage(
        '일시적인 오류가 발생했습니다. 카카오톡 간편 로그인을 다시 진행해주세요.'
      );

      return;
    }

    handleKakaoLogin(code, receivedState);
  }, [handleKakaoLogin, isProcessing, router]);

  return <EasyLoginLoadingPage type="kakao" />;
};

export default KakaoCallback;
