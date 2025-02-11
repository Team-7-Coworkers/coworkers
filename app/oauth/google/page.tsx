'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postAuthEasySignIn } from '../../api/auth.api'; // 백엔드와 통신하는 API 함수
import useUserStore from '@/app/stores/userStore';
import { useSession } from 'next-auth/react';
import EasyLoginLoadingPage from '../EasyLoginLoadingPage';

const GoogleCallback = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { setAccessToken, setRefreshToken, setUser, setIsGoogleLogin } =
    useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const googleLoginMutation = useMutation({
    mutationFn: postAuthEasySignIn,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      router.push('/');
    },
    onError: (error) => {
      console.error('구글 로그인 실패:', error);
      alert('구글 로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleGoogleLogin = useCallback(
    (token: string) => {
      googleLoginMutation.mutate({
        token,
        provider: 'GOOGLE',
      });

      console.log(token);
    },
    [googleLoginMutation]
  );

  useEffect(() => {
    if (isProcessing) return;

    if (status === 'authenticated') {
      setIsProcessing(true);

      const jwtToken = session?.idToken;

      if (!jwtToken) {
        alert('JWT 토큰을 찾을 수 없습니다. 다시 로그인해주세요.');

        router.push('/login');
        return;
      }

      handleGoogleLogin(jwtToken);
      setIsGoogleLogin(true);
    }
  }, [
    status,
    session,
    isProcessing,
    router,
    handleGoogleLogin,
    setIsGoogleLogin,
  ]);

  return <EasyLoginLoadingPage type="google" />;
};

export default GoogleCallback;
