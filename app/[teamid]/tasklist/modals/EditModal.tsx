import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import Button from '@/app/components/Button';
import InputField from '@/app/components/InputField';

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
          onChange={(e) => setTitle(e.target.value)}
          className="mt-3"
        />
      </section>
      <section className="mt-5">
        <label
          htmlFor="edit-description"
          className="text-lg font-medium text-t-primary"
        >
          할 일 메모
        </label>
        {/*TODO: 수정하기 및 등록하기 제목 인풋 글자수 제한 걸기 */}
        <InputField
          id="edit-description"
          type="text"
          placeholder="메모를 입력하세요."
          value={description}
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
