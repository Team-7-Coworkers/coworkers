'use client';

import React from 'react';
import ResetPasswordForm from '@/app/reset-password/ResetPasswordForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { patchUserResetPassword } from '../api/user.api';

export default function ResetPasswordPage() {
  const urlParams = new URL(window.location.href).searchParams;
  const token = urlParams.get('token') ?? '';

  const resetPasswordMutation = useMutation({
    mutationFn: ({
      password,
      passwordConfirmation,
    }: {
      password: string;
      passwordConfirmation: string;
    }) => patchUserResetPassword({ token, password, passwordConfirmation }),
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다!');
      window.location.href = '/login';
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          '비밀번호 재설정 중 오류가 발생했습니다.';
        alert(`비밀번호 재설정 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleResetPasswordSubmit = (formData: {
    password: string;
    confirmPassword: string;
  }) => {
    const { password, confirmPassword: passwordConfirmation } = formData;
    resetPasswordMutation.mutate({ password, passwordConfirmation });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <h2 className="mb-6 text-center text-2xl font-medium lg:text-4xl">
        비밀번호 재설정
      </h2>
      <div className="w-full max-w-[460px] sm:pt-[80px]">
        <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />
      </div>
    </div>
  );
}
