'use client';
import Button from '@/app/components/Button';
import Image from 'next/image';

export default function AddButton() {
  return (
    <Button
      styleType="solid"
      state="floating"
      size="w-[125px] h-[48px] absolute bottom-5 lg:right-35 right-5 flex gap-1 items-center justify-center"
      onClick={() => alert('할 일 추가 버튼 클릭')}
    >
      <Image
        src="/images/icons/icon-plus.svg"
        alt="플러스"
        width={16}
        height={16}
      />
      할 일 추가
    </Button>
  );
}
