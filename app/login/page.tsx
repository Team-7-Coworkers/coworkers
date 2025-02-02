'use client';

import React from 'react';
import LoginForm from '@/app/login/LoginForm';
import { postAuthSignIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../stores/userStore';
import { AuthResponseType, LoginFormDataType } from '../types/auth';
import axios from 'axios';
import Link from 'next/link';
import EasyLogin from './EasyLogin';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { setAccessToken, setRefreshToken, setUser } = useUserStore();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: postAuthSignIn,
    onSuccess: (data: AuthResponseType['postAuthSignIn']) => {
      const { user, accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      alert('로그인에 성공했습니다!');
      router.push('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`로그인 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleLoginSubmit = (formData: LoginFormDataType) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">
        로그인
      </h2>
      <div className="w-full max-w-[460px] space-y-12 sm:pt-[80px]">
        <div className="space-y-6">
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
          <EasyLogin />
        </div>
      </div>
    </div>
  );
}
