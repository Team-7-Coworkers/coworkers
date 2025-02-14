'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';
import useUserStore from '@app/stores/userStore';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
  const { setIsGoogleLogin } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

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

    if (status === 'unauthenticated') {
      toast.error('로그인 상태가 아닙니다. 다시 로그인해주세요.');
      router.push('/login');

      return;
    }

    if (status === 'authenticated') {
      setIsProcessing(true);
      const jwtToken = session?.idToken;

      if (!jwtToken) {
        toast.error('구글 로그인 중 문제가 발생했습니다. 다시 로그인해주세요.');
        router.push('/login');

        return;
      }

      handleGoogleLogin(jwtToken);
      setIsGoogleLogin(true);
    } else {
    }
  }, [
    status,
    session,
    isProcessing,
    handleGoogleLogin,
    setIsGoogleLogin,
    router,
  ]);

  return <EasyLoginLoadingPage type="google" />;
};

export default GoogleCallback;
