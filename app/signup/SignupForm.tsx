'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import type { SignUpFormDataType } from '@app/types/auth';
import InputField from '@components/InputField';
import Button from '@components/Button';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '@utils/formValidators';

interface SignupFormProps {
  onSubmit: (formData: SignUpFormDataType) => void;
  initialFormData?: SignUpFormDataType;
}

export default function SignupForm({
  onSubmit,
  initialFormData = {
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
}: SignupFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isValidated, setIsValidated] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {
      nickname: validateName(formData.nickname.trim()) || '',
      email: validateEmail(formData.email.trim()) || '',
      password: validatePassword(formData.password.trim()) || '',
      confirmPassword:
        validateConfirmPassword(formData.confirmPassword.trim()) || '',
    };

    setIsValidated(!Object.values(newErrors).some((error) => error));
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidated) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 bg-transparent font-medium"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="nickname">이름</label>
          <InputField
            id="nickname"
            type="text"
            placeholder="이름을 입력해주세요."
            value={formData.nickname}
            onChange={handleChange}
            validator={validateName}
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="email">이메일</label>
          <InputField
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={formData.email}
            onChange={handleChange}
            validator={validateEmail}
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="password">비밀번호</label>
          <InputField
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={formData.password}
            onChange={handleChange}
            validator={validatePassword}
            isPassword={true}
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <InputField
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            value={formData.confirmPassword}
            onChange={handleChange}
            validator={validateConfirmPassword}
            isPassword={true}
          />
        </div>
      </div>
      <div className="space-y-6">
        <Button
          type="submit"
          styleType="solid"
          size="py-3.5 w-full text-md"
          state="default"
          disabled={!isValidated}
        >
          회원가입
        </Button>
        <Link
          href="/login"
          className="block w-fit cursor-pointer place-self-end text-right text-md text-emerald-500 underline hover:opacity-50 sm:text-lg"
        >
          로그인 페이지로
        </Link>
      </div>
    </form>
  );
}
