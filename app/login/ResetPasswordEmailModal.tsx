import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import type { UserResponseType } from '@app/types/user';
import { postUserSendRestPasswordEmail } from '@api/user.api';
import InputField from '@components/InputField';
import Modal, { ModalFooter } from '@components/Modal';
import Button from '@components/Button';
import { validateEmail } from '@utils/formValidators';
import { createErrorHandler } from '@utils/createErrorHandler';

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
    onError: createErrorHandler({ prefixMessage: '로그인 실패' }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    setEmail('');
    onClose();
  };

  const handleSendEmail = () => {
    sendResetPasswordLinkMutation.mutate({
      email,
      redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL ?? '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      isCloseOutsideClick={true}
      title="비밀번호 재설정 이메일"
      onClose={handleClose}
    >
      {isOpen && (
        <div className="mb-6 mt-4">
          <InputField
            id="reset-password-email"
            type="email"
            placeholder="링크를 받을 이메일을 입력하세요."
            value={email}
            onChange={handleChange}
            validator={validateEmail}
          />
        </div>
      )}

      <ModalFooter>
        <Button
          onClick={onClose}
          styleType="outlined"
        >
          취소
        </Button>
        <Button onClick={handleSendEmail}>링크 보내기</Button>
      </ModalFooter>
    </Modal>
  );
}
