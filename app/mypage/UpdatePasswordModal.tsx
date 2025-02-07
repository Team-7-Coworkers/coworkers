'use client';

import { useCallback, useEffect, useState } from 'react';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import {
  validateConfirmPassword,
  validatePassword,
} from '../utils/formValidators';
import Button from '../components/Button';
import { PasswordFormDataTypes } from './page';

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePassword: (formData: PasswordFormDataTypes) => void;
}

const initialPasswordFormData = {
  password: '',
  confirmPassword: '',
};

export default function UpdatePasswordModal({
  isOpen,
  onClose,
  onUpdatePassword,
}: UpdatePasswordModalProps) {
  const [passwordFormData, setPasswordFormData] = useState(
    initialPasswordFormData
  );
  const [isValidated, setIsValidated] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {
      password: validatePassword(passwordFormData.password.trim()) || '',
      confirmPassword:
        validateConfirmPassword(passwordFormData.confirmPassword.trim()) || '',
    };

    // 에러가 하나라도 있으면 false 반환
    setIsValidated(!Object.values(newErrors).some((error) => error));
  }, [passwordFormData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setPasswordFormData(initialPasswordFormData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="비밀번호 변경"
      onClose={handleClose}
    >
      <div className="mb-6 mt-4 space-y-4 text-white">
        <div className="space-y-2">
          <p>비밀번호</p>
          <InputField
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={passwordFormData.password}
            onChange={handleChange}
            validator={validatePassword}
            isPassword={true}
          />
        </div>
        <div className="space-y-2">
          <p>비밀번호 확인</p>
          <InputField
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordFormData.confirmPassword}
            onChange={handleChange}
            validator={validateConfirmPassword}
            isPassword={true}
          />
        </div>
      </div>

      <ModalFooter>
        <Button
          onClick={onClose}
          styleType="outlined"
        >
          취소
        </Button>
        <Button
          onClick={() => onUpdatePassword(passwordFormData)}
          disabled={!isValidated}
        >
          변경
        </Button>
      </ModalFooter>
    </Modal>
  );
}
