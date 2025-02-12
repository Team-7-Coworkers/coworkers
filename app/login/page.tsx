'use client';

import React, { useEffect } from 'react';
import LoginForm from '@/app/login/LoginForm';
import { postAuthSignIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../stores/userStore';
import { AuthResponseType, LoginFormDataType } from '../types/auth';
import Link from 'next/link';
import EasyLogin from './EasyLogin';
import { useRouter } from 'next/navigation';
import { createErrorHandler } from '../utils/createErrorHandler';

export default function LoginPage() {
  const { user, setAccessToken, setRefreshToken, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.push('/');
    }
  }, [user, router]);

  const loginMutation = useMutation({
    mutationFn: postAuthSignIn,
    onSuccess: (data: AuthResponseType['postAuthSignIn']) => {
      const { user, accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      router.push('/');
    },
    onError: createErrorHandler({ prefixMessage: '로그인 실패' }),
  });

  const handleLoginSubmit = (formData: LoginFormDataType) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex h-full flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">
        로그인
      </h2>
      <div className="w-full max-w-[460px] space-y-12 sm:pt-[80px]">
        <div className="flex flex-col gap-6">
          <LoginForm onSubmit={handleLoginSubmit} />
          <div className="text-center font-medium">
            아직 계정이 없으신가요?
            <Link
              href="/signup"
              className="ml-2 text-primary underline hover:opacity-50"
            >
              가입하기
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1 border-t border-bd-primary opacity-10"></div>
            <span>OR</span>
            <div className="flex-1 border-t border-bd-primary opacity-10"></div>
          </div>
          <EasyLogin page="login" />
        </div>
      </div>
    </div>
  );
}
