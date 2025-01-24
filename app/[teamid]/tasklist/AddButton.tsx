'use client';
import Button from '@/app/components/Button';
import Image from 'next/image';
import { useState } from 'react';
import TodoModal from './TodoModal';

export default function AddButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveTodo = (todo: {
    title: string;
    date: Date | null;
    repeatOption: string;
    memo: string;
  }) => {
    console.log('Saved Todo:', todo); // api 적용 전 임시 저장 로직
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
      <TodoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTodo}
      />
    </div>
  );
}
