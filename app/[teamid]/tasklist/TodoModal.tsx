'use client';

import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import CustomCalendar from './CustomCalendar';
import RepeatDropdown from './RepeatDropdown';
import TextField from '@/app/components/TextField';
import InputField from '@/app/components/InputField';
import Button from '@/app/components/Button';
import instance from '../../libs/axios';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  onSaveSuccess: () => void;
}

export default function TodoModal({
  isOpen,
  onClose,
  groupId,
  taskListId,
  onSaveSuccess,
}: TodoModalProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [repeatOption, setRepeatOption] = useState('ONCE');
  const [todoMemo, setTodoMemo] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      const startDate = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
          ).padStart(
            2,
            '0'
          )}-${String(selectedDate.getDate()).padStart(2, '0')}T00:00:00Z`
        : '';

      const frequencyTypeMap: { [key: string]: string } = {
        '한 번': 'ONCE',
        '매일 반복': 'DAILY',
        '주 반복': 'WEEKLY',
        '월 반복': 'MONTHLY',
      };

      const mappedFrequencyType = frequencyTypeMap[repeatOption];
      if (!mappedFrequencyType) {
        console.error('Invalid frequencyType:', repeatOption);
        return;
      }

      let additionalFields = {};
      if (mappedFrequencyType === 'MONTHLY') {
        additionalFields = {
          monthDay: selectedDate?.getDate() || 0,
        };
      } else if (mappedFrequencyType === 'WEEKLY') {
        additionalFields = {
          weekDays: selectedWeekDays,
        };
      }

      console.log({
        name: todoTitle,
        description: todoMemo,
        startDate,
        frequencyType: mappedFrequencyType,
        ...additionalFields,
      });

      const response = await instance.post(
        `groups/${groupId}/task-lists/${taskListId}/tasks`,
        {
          name: todoTitle,
          description: todoMemo,
          startDate,
          frequencyType: mappedFrequencyType,
          ...additionalFields,
        }
      );

      console.log('할 일 생성 성공:', response.data);
      onSaveSuccess();
      onClose();
    } catch (error) {
      console.error('할 일 생성 실패:', error);
    }
  };

  const isFormValid =
    todoTitle.trim() !== '' && selectedDate !== null && repeatOption !== 'ONCE';

  return (
    <Modal
      isOpen={isOpen}
      title="할 일 만들기"
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
          htmlFor="todo-title"
          className="text-lg font-medium text-t-primary"
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
      <section className="mt-5">
        <label
          htmlFor="start-date"
          className="text-lg font-medium text-t-primary"
        >
          시작 날짜 및 시간
        </label>
        <div
          id="start-date"
          className={`mt-3 cursor-pointer rounded-xl border p-4 text-lg text-t-default ${
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
          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        )}
        <RepeatDropdown
          onSelectRepeatOption={(option: string, days?: number[]) => {
            setRepeatOption(option);
            if (days) {
              setSelectedWeekDays(days);
            }
          }}
        />
      </section>
      <section className="mt-5">
        <label
          htmlFor="todo-memo"
          className="text-lg font-medium text-t-primary"
        >
          할 일 메모
        </label>
        <div className="mt-3">
          <TextField
            id="todo-memo"
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
