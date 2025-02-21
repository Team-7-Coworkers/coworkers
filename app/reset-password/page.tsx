'use client';

import React, { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { patchUserResetPassword } from '@api/user.api';
import { createErrorHandler } from '@utils/createErrorHandler';
import ResetPasswordForm from '@app/reset-password/ResetPasswordForm';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const tokenFromUrl = urlParams.get('token') ?? '';
    setToken(tokenFromUrl);
  }, []);

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
    onError: createErrorHandler({ prefixMessage: '비밀번호 재설정 실패' }),
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
