'use client';

import React, { useCallback, useEffect, useState } from 'react';

import type { UserFormDataTypes } from '@app/mypage/page';
import type { UserType } from '@app/types/shared';
import InputField from '@components/InputField';
import Button from '@components/Button';
import ImageUpload from '@components/ImageUpload';
import { validateName, validateUserUpdated } from '@app/utils/formValidators';

export interface MyPageFormProps {
  initialFormData: UserFormDataTypes;
  isEditing: boolean;
  onSubmit: (formData: UserFormDataTypes) => void;
  user: UserType | null;
}

export default function MyPageForm({
  initialFormData,
  isEditing,
  onSubmit,
  user,
}: MyPageFormProps) {
  const [isValidated, setIsValidated] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const validateForm = useCallback(() => {
    const trimmedName = formData.nickname.trim();
    const error = validateName(trimmedName);
    setIsValidated(!error);
  }, [formData.nickname]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidated) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname,
        image: user.image || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setIsChanged(
      validateUserUpdated(user, {
        nickname: formData.nickname,
        image: formData.image,
      })
    );
    setIsValidated(!validateName(formData.nickname.trim()));
  }, [user, formData.nickname, formData.image]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="flex flex-col items-start justify-start space-y-3">
        <label htmlFor="image">프로필 이미지</label>
        <ImageUpload
          url={formData.image}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={() => {}}
          variant="circle"
          disabled={!isEditing}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="nickname">이름</label>
        <InputField
          id="nickname"
          type="text"
          placeholder="이름을 입력해주세요."
          value={formData.nickname}
          onChange={handleChange}
          validator={validateName}
          state={isEditing ? undefined : 'default-disabled'}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <label htmlFor="email">이메일</label>
          {isEditing && (
            <p className="text-xs text-t-default">
              이메일은 변경할 수 없습니다.
            </p>
          )}
        </div>
        <InputField
          id="email"
          type="email"
          placeholder={user?.email || ''}
          onChange={handleChange}
          state="default-disabled"
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isEditing ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Button
          type="submit"
          size="large"
          classname="w-full"
          disabled={!isValidated || !isChanged}
        >
          변경 사항 저장
        </Button>
      </div>
    </form>
  );
}
