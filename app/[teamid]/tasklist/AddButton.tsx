'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/app/components/Button';
import TodoModal from './modals/TodoModal';

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
  const queryClient = useQueryClient();

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    onSaveSuccess();

    queryClient.invalidateQueries({
      queryKey: ['tasks', groupId, taskListId],
    });
  };

  return (
    <div>
      <Button
        styleType="solid"
        state="floating"
        size="w-[125px] h-[48px] fixed bottom-5 lg:right-36 right-5 flex gap-1 items-center justify-center"
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
