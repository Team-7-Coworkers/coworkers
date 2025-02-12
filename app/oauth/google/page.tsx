'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';
import useUserStore from '@app/stores/userStore';

const GoogleCallback = () => {
  const { data: session, status } = useSession();
  const { setIsGoogleLogin } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const easySignInMutation = useEasySignIn();

  const handleGoogleLogin = useCallback(
    (token: string) => {
      easySignInMutation.mutate({
        token,
        provider: 'GOOGLE',
      });
    },
    [easySignInMutation]
  );

  useEffect(() => {
    if (isProcessing) return;

    if (status === 'authenticated') {
      setIsProcessing(true);
      const jwtToken = session?.idToken;

      if (!jwtToken) {
        toast.error('JWT 토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
        return;
      }

      handleGoogleLogin(jwtToken);
      setIsGoogleLogin(true);
    }
  }, [status, session, isProcessing, handleGoogleLogin, setIsGoogleLogin]);

  return <EasyLoginLoadingPage type="google" />;
};

export default GoogleCallback;
