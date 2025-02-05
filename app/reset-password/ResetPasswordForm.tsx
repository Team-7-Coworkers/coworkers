'use client';

import React, { useCallback, useEffect, useState } from 'react';
import InputField from '@components/InputField';
import Button from '@components/Button';
import {
  validateConfirmPassword,
  validatePassword,
} from '@/app/utils/formValidators';

interface ResetPasswordFormProps {
  onSubmit: (formData: { password: string; confirmPassword: string }) => void;
}

export default function ResetPasswordForm({
  onSubmit,
}: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isValidated, setIsValidated] = useState(false);

  const validateForm = useCallback(() => {
    const passwordError = validatePassword(formData.password.trim());
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword.trim()
    );

    setIsValidated(!passwordError && !confirmPasswordError);
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
          <label htmlFor="password">새 비밀번호</label>
          <InputField
            id="password"
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
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

      <Button
        type="submit"
        styleType="solid"
        size="py-3.5 w-full text-md"
        state="default"
        disabled={!isValidated}
      >
        비밀번호 재설정
      </Button>
    </form>
  );
}
