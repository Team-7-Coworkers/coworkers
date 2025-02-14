'use client';

import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import CustomCalendar from '../CustomCalendar';
import RepeatDropdown from '../RepeatDropdown';
import TextField from '@/app/components/TextField';
import InputField from '@/app/components/InputField';
import Button from '@/app/components/Button';
import { postGroupsTaskListsTasks } from '@/app/api/task.api';
import { TaskParamsType } from '@/app/types/task';
import { FrequencyType } from '@/app/types/shared';
import axios from 'axios';
import { MAX_LENGTH } from '@/app/constants/form';

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
  const [repeatOption, setRepeatOption] = useState<FrequencyType>('ONCE');
  const [todoMemo, setTodoMemo] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      const startDate = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
          ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(
            2,
            '0'
          )}T00:00:00Z`
        : '';

      let taskParams: TaskParamsType['postGroupsTaskListsTasks'];

      if (repeatOption === 'MONTHLY') {
        taskParams = {
          frequencyType: 'MONTHLY',
          groupId,
          taskListId,
          name: todoTitle,
          description: todoMemo,
          startDate,
          monthDay: selectedDate?.getDate() || 1,
        };
      } else if (repeatOption === 'WEEKLY') {
        taskParams = {
          frequencyType: 'WEEKLY',
          groupId,
          taskListId,
          name: todoTitle,
          description: todoMemo,
          startDate,
          weekDays: selectedWeekDays,
        };
      } else {
        taskParams = {
          frequencyType: repeatOption,
          groupId,
          taskListId,
          name: todoTitle,
          description: todoMemo,
          startDate,
        };
      }

      await postGroupsTaskListsTasks(taskParams);
      onSaveSuccess();
      onClose();
    } catch (error: unknown) {
      console.error('할 일 생성 실패:', error);

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data.message || '서버 오류가 발생했습니다.'
        );
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const isFormValid = todoTitle.trim() !== '' && selectedDate !== null;

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
          maxlength={MAX_LENGTH.taskName}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          className="mt-3"
        />
        <div className="help-message">
          할 일 제목은 최대 {MAX_LENGTH.taskName}자 입니다.
        </div>
      </section>

      <section className="mt-5">
        <label
          htmlFor="start-date"
          className="text-lg font-medium text-t-primary"
        >
          시작 날짜
        </label>

        <div
          id="start-date"
          className={`mb-3 mt-3 h-[43px] cursor-pointer rounded-xl border px-4 py-3 text-lg text-t-default sm:h-[53px] sm:py-4 ${
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
        {errorMessage && (
          <p className="mb-2 mt-2 text-sm text-red-500">{errorMessage}</p>
        )}

        <RepeatDropdown
          onSelectRepeatOption={(option, days) => {
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
            maxlength={MAX_LENGTH.taskMemo}
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
