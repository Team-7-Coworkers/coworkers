'use client';
import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import CustomCalendar from './CustomCalendar';
import RepeatDropdown from './RepeatDropdown';
import TextField from '@/app/components/TextField';
import InputField from '@/app/components/InputField';
import Button from '@/app/components/Button';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: {
    title: string;
    date: Date | null;
    repeatOption: string;
    memo: string;
  }) => void;
}

export default function TodoModal({ isOpen, onClose, onSave }: TodoModalProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [repeatOption, setRepeatOption] = useState('반복 안함');
  const [todoMemo, setTodoMemo] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const isFormValid =
    todoTitle.trim() !== '' &&
    selectedDate !== null &&
    repeatOption !== '반복 안함';

  const handleSave = () => {
    onSave({
      title: todoTitle,
      date: selectedDate,
      repeatOption,
      memo: todoMemo,
    });
    onClose();
  };

  const labelStyle = 'text-lg font-medium text-t-primary';
  const sectionDiv = 'mt-5';

  return (
    <Modal
      isOpen={isOpen}
      title="할 일 만들기"
      isCloseOutsideClick
      onClose={onClose}
    >
      <p className="mt-4 text-center font-medium leading-5 text-t-default">
        할 일은 실제로 행동 가능한 작업 중심으로
        <br /> 작성해주시면 좋습니다.
      </p>
      <section className={sectionDiv}>
        <label
          htmlFor="todo-title"
          className={labelStyle}
        >
          할 일 제목
        </label>
        <InputField
          id="todo-title"
          type="text"
          placeholder="할 일 제목을 입력해주세요."
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          className="mt-3"
        />
      </section>
      <section className={sectionDiv}>
        <label
          htmlFor="start-date"
          className={labelStyle}
        >
          시작 날짜 및 시간
        </label>
        <div
          className={`mt-3 cursor-pointer rounded-xl border p-4 px-4 py-3 text-lg text-t-default hover:border-primary sm:py-4 sm:text-lg ${
            isCalendarOpen ? 'border-primary' : 'border-bd-primary/10'
          }`}
          onClick={() => setIsCalendarOpen((prev) => !prev)}
        >
          {selectedDate
            ? selectedDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '날짜를 선택해주세요.'}
        </div>
        {isCalendarOpen && (
          <div className="mt-3">
            <CustomCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        )}
        <RepeatDropdown
          onSelectRepeatOption={(option: string) => setRepeatOption(option)}
        />
      </section>
      <section className={sectionDiv}>
        <label
          htmlFor="todo-memo"
          className={labelStyle}
        >
          할 일 메모
        </label>
        <div className="mt-3">
          <TextField
            type="box"
            placeholder="메모를 입력해주세요."
            value={todoMemo}
            onChange={(e) => setTodoMemo(e.target.value)}
          />
        </div>
      </section>
      <ModalFooter>
        <Button
          styleType="solid"
          state="default"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          만들기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
