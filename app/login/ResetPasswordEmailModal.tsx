import { useState } from 'react';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import { validateEmail } from '../utils/formValidators';
import Button from '../components/Button';

interface ResetPasswordEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordEmailModal({
  isOpen,
  onClose,
}: ResetPasswordEmailModalProps) {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
        <Button>링크 보내기</Button>
      </ModalFooter>
    </Modal>
  );
}
