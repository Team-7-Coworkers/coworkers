'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { calculateDate, formatDate } from '../../utils/date';

export default function ListDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => calculateDate(prevDate, -1));
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => calculateDate(prevDate, 1));
  };

  const arrowButtonClass = 'rounded-full bg-b-secondary hover:bg-b-tertiary';

  return (
    <div className="flex items-center text-lg font-medium text-t-primary">
      <span>{formatDate(currentDate)}</span>
      <div className="ml-2 flex items-center sm:ml-3">
        <div className="flex gap-1 sm:gap-2">
          <button
            aria-label="이전 날짜"
            className={arrowButtonClass}
            onClick={handlePreviousDay}
          >
            <Image
              src="/images/icons/ic_left-arrow.svg"
              alt="왼쪽 화살표"
              width={16}
              height={16}
            />
          </button>
          <button
            aria-label="다음 날짜"
            className={arrowButtonClass}
            onClick={handleNextDay}
          >
            <Image
              src="/images/icons/ic_right-arrow.svg"
              alt="오른쪽 화살표"
              width={16}
              height={16}
            />
          </button>
        </div>
        {/* 캘린더 선택 기능은 후에 추가하겠습니다! 라이브러리 사용할 지?*/}
        <button
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-xl bg-b-secondary hover:bg-b-tertiary sm:ml-3"
          onClick={() => alert('달력 기능은 아직 구현하지 않았습니다!')}
        >
          <Image
            src="/images/icons/ic_calendar.svg"
            alt="달력"
            width={12}
            height={12}
          />
        </button>
      </div>
    </div>
  );
}
