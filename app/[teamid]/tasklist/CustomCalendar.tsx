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

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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
        renderDayContents={(day, date) => (
          <div className="relative flex items-center justify-center">
            {day} {/*오늘 날짜 점(dot) 추가로 강조 */}
            {date && isToday(date) && (
              <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"></span>
            )}
          </div>
        )}
      />
    </div>
  );
}
