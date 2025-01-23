'use client';

import React from 'react';
import LoginForm from '@/app/login/LoginForm';
import { postAuthSignIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../stores/userStore';
import axios from 'axios';
import { authResponseType } from '../types/auth';

type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { setToken, setUser } = useUserStore();

  const loginMutation = useMutation({
    mutationFn: postAuthSignIn,
    onSuccess: (data: authResponseType['postAuthSignIn']) => {
      const { accessToken, user } = data;
      setToken(accessToken);
      setUser(user);
      alert('로그인에 성공했습니다!');
      console.log('로그인 성공:', data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        alert(`로그인 오류: ${errorMessage}`);
      } else {
        console.error('Unexpected Error:', error);
      }
    },
  });

  // 폼 제출 핸들러
  const handleLoginSubmit = (formData: LoginFormType) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl"></h2>
      <div className="w-full max-w-[460px] sm:pt-[80px]">
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
}
