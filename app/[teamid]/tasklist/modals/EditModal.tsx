import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import Button from '@/app/components/Button';
import InputField from '@/app/components/InputField';
import { MAX_LENGTH } from '@/app/constants/form';
import TextField from '@/app/components/TextField';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string) => void;
  initialTitle: string;
  initialDescription: string;
};

export default function EditModal({
  isOpen,
  onClose,
  onConfirm,
  initialTitle,
  initialDescription,
}: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleConfirm = () => {
    onConfirm(title, description);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="할 일 수정하기"
      isCloseOutsideClick
      onClose={onClose}
    >
      <p className="mt-3 text-center font-medium leading-5 text-t-default">
        할 일은 실제로 행동 가능한 작업 중심으로
        <br />
        작성해주시면 좋습니다.
      </p>
      <section className="mt-5">
        <label
          htmlFor="edit-title"
          className="text-lg font-medium text-t-primary"
        >
          할 일 제목
        </label>
        <InputField
          id="edit-title"
          type="text"
          placeholder="할 일 제목을 입력해주세요."
          value={title}
          maxlength={MAX_LENGTH.taskName}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-3"
        />
        <div className="help-message">
          할 일 제목은 최대 {MAX_LENGTH.taskName}자 입니다.
          {/*TODO: 카운터 추가해보기*/}
          추가해보기
        </div>
      </section>
      <section className="mt-5">
        <label
          htmlFor="edit-description"
          className="text-lg font-medium text-t-primary"
        >
          할 일 메모
        </label>
        <TextField
          id="edit-description"
          type="box"
          placeholder="메모를 입력하세요."
          value={description}
          maxlength={MAX_LENGTH.taskMemo}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-3"
        />
      </section>
      <ModalFooter>
        <Button
          state="default"
          styleType="solid"
          size="h-12"
          onClick={handleConfirm}
        >
          수정하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
