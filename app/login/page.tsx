'use client';

import React from 'react';
import LoginForm from '@/app/login/LoginForm';
import { postAuthSignIn } from '../api/auth.api';
import axios from 'axios';

export default function LoginPage() {
  const handleLoginSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    const { email, password } = formData;

    try {
      const response = await postAuthSignIn({ email, password });

      console.log(response);
      alert('로그인에 성공했습니다!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        alert(`로그인 오류: ${errorMessage}`);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
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
