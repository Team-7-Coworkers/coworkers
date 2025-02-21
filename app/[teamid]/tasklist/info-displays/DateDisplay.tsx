import Image from 'next/image';
import dayjs from 'dayjs';

interface DateDisplayProps {
  date: string;
}

const DateDisplay = ({ date }: DateDisplayProps) => (
  <div className="flex items-center gap-2">
    <Image
      src="/images/icons/ic_calendar.svg"
      alt="달력"
      width={16}
      height={16}
    />
    <p className="text-xs text-t-default">
      {dayjs(date).format('YYYY년 MM월 DD일')}
    </p>
  </div>
);

export default DateDisplay;
