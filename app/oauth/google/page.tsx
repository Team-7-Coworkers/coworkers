'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import EasyLoginLoadingPage from '@app/oauth/EasyLoginLoadingPage';
import { useEasySignIn } from '@hooks/useEasySignIn';

const GoogleCallback = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const easySignInMutation = useEasySignIn({ provider: 'GOOGLE' });

  const handleGoogleLogin = useCallback(
    async (token: string) => {
      const data = await easySignInMutation.mutateAsync({
        token,
        provider: 'GOOGLE',
      });

      if (data.user?.nickname && /^\d+$/.test(data.user.nickname)) {
        toast.warn(
          `'${session?.user.name}'은 사용중인 닉네임 입니다. 계정 설정에서 닉네임을 변경해주세요!`
        );
      }
    },
    [easySignInMutation, session?.user.name]
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
    }
  }, [status, session, isProcessing, handleGoogleLogin, router]);

  return <EasyLoginLoadingPage type="google" />;
};

export default GoogleCallback;
