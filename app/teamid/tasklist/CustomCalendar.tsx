'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css';

type CustomCalendarProps = {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
};

export default function CustomCalendar({
  onDateSelect,
  selectedDate,
}: CustomCalendarProps) {
  const handleDateChange = (date: Date | null) => {
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
