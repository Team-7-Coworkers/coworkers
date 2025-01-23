'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { calculateDate, formatDate } from '../../utils/date';
import CustomCalendar from './CustomCalendar';

export default function ListDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => calculateDate(prevDate, -1));
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => calculateDate(prevDate, 1));
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    setIsCalendarOpen(false);
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
        <div className="relative">
          <button
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-xl bg-b-secondary hover:bg-b-tertiary sm:ml-3"
            onClick={() => setIsCalendarOpen((prev) => !prev)}
          >
            <Image
              src="/images/icons/ic_calendar.svg"
              alt="달력"
              width={12}
              height={12}
            />
          </button>
          {isCalendarOpen && (
            <div className="absolute left-0 top-full z-10 mt-2">
              <CustomCalendar onDateSelect={handleDateSelect} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
