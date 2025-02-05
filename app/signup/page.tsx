'use client';

import React from 'react';
import SignupForm from '@/app/signup/SignupForm';
import { postAuthSignUp } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignUpFormDataType } from '../types/auth';
import { useRouter } from 'next/navigation';
import EasyLogin from '../login/EasyLogin';

export default function SignupPage() {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: postAuthSignUp,
    onSuccess: () => {
      alert('회원가입에 성공했습니다!');
      router.push('/login');
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
    <div className="flex h-full flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">
        회원가입
      </h2>
      <div className="w-full max-w-[460px] space-y-8 sm:pt-[80px]">
        <SignupForm onSubmit={handleSignupSubmit} />
        <div className="space-y-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1 border-t border-bd-primary opacity-10"></div>
            <span>OR</span>
            <div className="flex-1 border-t border-bd-primary opacity-10"></div>
          </div>
          <EasyLogin page="signup" />
        </div>
      </div>
    </div>
  );
}
