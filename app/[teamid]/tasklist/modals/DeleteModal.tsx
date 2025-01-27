import React from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import Button from '@/app/components/Button';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={`'${itemName}'`}
      isCloseOutsideClick
      onClose={onClose}
      icon="danger"
    >
      <p className="text-center text-base text-t-primary">
        할 일을 정말 삭제하시겠어요?
      </p>
      <p className="mt-4 text-center font-medium text-t-secondary">
        삭제 후에는 되돌릴 수 없습니다.
      </p>
      <ModalFooter>
        <Button
          state="default"
          styleType="outlined-secondary"
          size="h-12"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          state="danger"
          onClick={onConfirm}
          size="h-12"
        >
          삭제하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
