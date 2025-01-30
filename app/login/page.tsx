'use client';

import React from 'react';
import LoginForm from '@/app/login/LoginForm';
import { postAuthSignIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../stores/userStore';
import { AuthResponseType, LoginFormDataType } from '../types/auth';
import axios from 'axios';

export default function LoginPage() {
  const { setAccessToken, setRefreshToken, setUser } = useUserStore();

  const loginMutation = useMutation({
    mutationFn: postAuthSignIn,
    onSuccess: (data: AuthResponseType['postAuthSignIn']) => {
      const { user, accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      alert('로그인에 성공했습니다!');
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
      <div className="w-full max-w-[460px] sm:pt-[80px]">
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
}
