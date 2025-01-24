'use client';

import Button from '@/app/components/Button';
import Image from 'next/image';
import { useState } from 'react';
import TodoModal from './TodoModal';

interface AddButtonProps {
  groupId: number;
  taskListId: number;
  onSaveSuccess: () => void;
}

export default function AddButton({
  groupId,
  taskListId,
  onSaveSuccess,
}: AddButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveSuccess = () => {
    setModalOpen(false);
    onSaveSuccess();
  };

  return (
    <div>
      <Button
        styleType="solid"
        state="floating"
        size="w-[125px] h-[48px] absolute bottom-5 lg:right-35 right-5 flex gap-1 items-center justify-center"
        onClick={() => setModalOpen(true)}
      >
        <Image
          src="/images/icons/ic_list-plus.svg"
          alt="플러스"
          width={16}
          height={16}
        />
        할 일 추가
      </Button>
      {modalOpen && (
        <TodoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          groupId={groupId}
          taskListId={taskListId}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
