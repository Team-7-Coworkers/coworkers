'use client';
import Button from '@/app/components/Button';
import InputField from '@/app/components/InputField';
import Modal, { ModalFooter } from '@/app/components/Modal';
import Image from 'next/image';
import { useState } from 'react';
import CustomCalendar from './CustomCalendar';

export default function AddButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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
      <Modal
        isOpen={modalOpen}
        title="할 일 만들기"
        isCloseOutsideClick
        onClose={() => setModalOpen(false)}
      >
        <p className="mt-4 text-center font-medium leading-5 text-t-default">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br /> 작성해주시면 좋습니다.
        </p>
        <div className="mt-5">
          <label
            htmlFor="todo-title"
            className="text-lg font-medium text-t-primary"
          >
            할 일 제목
          </label>
          <InputField
            id="todo-title"
            type="text"
            placeholder="할 일 제목을 입력해주세요."
            className="mt-3"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="start-date"
            className="text-lg font-medium text-t-primary"
          >
            시작 날짜 및 시간
          </label>
          <div className="mt-3 rounded-xl border border-primary p-4 px-4 py-3 text-lg text-t-default sm:py-4 sm:text-lg">
            {selectedDate
              ? selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '날짜를 선택해주세요.'}
          </div>
          <div className="mt-3">
            <CustomCalendar onDateSelect={handleDateSelect} />
          </div>
        </div>
        <ModalFooter>
          <Button
            styleType="solid"
            state="default"
            onClick={() => alert('만들기 버튼 클릭!')}
          >
            만들기
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
