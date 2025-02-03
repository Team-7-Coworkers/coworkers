import { useState } from 'react';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import { validateEmail } from '../utils/formValidators';
import Button from '../components/Button';
import { useMutation } from '@tanstack/react-query';
import { postUserSendRestPasswordEmail } from '../api/user.api';
import { UserResponseType } from '../types/user';
import axios from 'axios';

interface ResetPasswordEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordEmailModal({
  isOpen,
  onClose,
}: ResetPasswordEmailModalProps) {
  const [email, setEmail] = useState('');

  const sendResetPasswordLinkMutation = useMutation({
    mutationFn: postUserSendRestPasswordEmail,
    onSuccess: (data: UserResponseType['postUserSendRestPasswordEmail']) => {
      const { message } = data;
      alert(message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`로그인 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    sendResetPasswordLinkMutation.mutate({
      email,
      redirectUrl: 'http://localhost:3000',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      isCloseOutsideClick={true}
      title="비밀번호 재설정 이메일"
      onClose={onClose}
    >
      <div className="mb-6 mt-4">
        <InputField
          id="reset-password-email"
          type="email"
          placeholder="비밀번호를 입력해주세요."
          value={email}
          onChange={handleChange}
          validator={validateEmail}
        />
      </div>
      <ModalFooter>
        <Button styleType="outlined">취소</Button>
        <Button onClick={handleSendEmail}>링크 보내기</Button>
      </ModalFooter>
    </Modal>
  );
}
