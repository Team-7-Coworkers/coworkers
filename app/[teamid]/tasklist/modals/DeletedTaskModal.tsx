'use client';

import Modal, { ModalFooter } from '@components/Modal';
import Button from '@components/Button';

interface DeletedTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeletedTaskModal({
  isOpen,
  onClose,
  onDelete,
}: DeletedTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="탈퇴한 회원의 게시글입니다."
      onClose={onClose}
      hasCloseButton={false}
      icon="danger"
    >
      <p className="mt-5 text-center text-md font-semibold text-t-default">
        삭제 후 목록 페이지로 돌아갑니다.
      </p>
      <ModalFooter>
        <Button
          state="danger"
          onClick={onDelete}
        >
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
}
