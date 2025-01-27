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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    onSaveSuccess();
  };

  return (
    <div>
      <Button
        styleType="solid"
        state="floating"
        size="w-[125px] h-[48px] absolute bottom-5 lg:right-35 right-5 flex gap-1 items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/images/icons/ic_list-plus.svg"
          alt="플러스"
          width={16}
          height={16}
        />
        할 일 추가
      </Button>
      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          groupId={groupId}
          taskListId={taskListId}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
