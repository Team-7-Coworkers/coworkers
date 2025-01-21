'use client';

import React from 'react';
import SignupForm from '@/app/signup/SignupForm';
import { postAuthSignUp } from '../api/auth.api';
import axios from 'axios';

export interface SignUpFormType {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignupPage() {
  const handleSignupSubmit = async (formData: {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const {
      nickname,
      email,
      password,
      confirmPassword: passwordConfirmation,
    } = formData;

    try {
      await postAuthSignUp({
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      // 임시로 alert사용
      alert('회원가입에 성공했습니다!');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        alert(`회원가입 오류: ${errorMessage}`);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-start bg-b-primary px-4 py-6 sm:pt-[100px] items-center">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">회원가입</h2>
      <div className="w-full max-w-[460px] sm:pt-[80px]">
        <SignupForm onSubmit={handleSignupSubmit} />
      </div>
    </div>
  );
}
