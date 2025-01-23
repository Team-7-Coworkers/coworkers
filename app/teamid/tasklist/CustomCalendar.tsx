'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css';

type CustomCalendarProps = {
  onDateSelect: (date: Date) => void;
};

export default function CustomCalendar({ onDateSelect }: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateSelect(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        dropdownMode="select"
        inline
        calendarClassName="react-datepicker"
      />
    </div>
  );
}
