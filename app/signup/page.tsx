'use client';

import React from 'react';
import SignupForm from '@/app/signup/SignupForm';
import { postAuthSignUp } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignUpFormDataType } from '../types/auth';

export default function SignupPage() {
  const signupMutation = useMutation({
    mutationFn: postAuthSignUp,
    onSuccess: () => {
      alert('회원가입에 성공했습니다!');
      window.location.href = '/login';
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || '회원가입 중 오류가 발생했습니다.';
        alert(`회원가입 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleSignupSubmit = (formData: SignUpFormDataType) => {
    const {
      nickname,
      email,
      password,
      confirmPassword: passwordConfirmation,
    } = formData;

    signupMutation.mutate({ email, nickname, password, passwordConfirmation });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">
        회원가입
      </h2>
      <div className="w-full max-w-[460px] sm:pt-[80px]">
        <SignupForm onSubmit={handleSignupSubmit} />
      </div>
    </div>
  );
}
