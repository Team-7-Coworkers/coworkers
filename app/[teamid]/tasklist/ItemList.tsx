import Image from 'next/image';
import Checkbox from './Checkbox';
import dayjs from 'dayjs';

type Item = {
  id: number;
  category: string;
  name: string;
  commentCount: number;
  date: string;
  frequency: string;
};

type ItemListProps = {
  items: Item[];
  checkedItems: { [key: number]: boolean };
  onCheckboxChange: (id: number) => void;
};

const frequencyMap: { [key: string]: string } = {
  ONCE: '한 번',
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};

const getFormattedFrequency = (frequency: string): string => {
  return frequencyMap[frequency] || '알 수 없음';
};

export default function ItemList({
  items,
  checkedItems,
  onCheckboxChange,
}: ItemListProps) {
  return (
    <div className="mt-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="mb-4 flex flex-col items-start rounded-lg bg-b-secondary px-3 py-[14px] text-white shadow-md"
        >
          <div className="relative flex w-full items-center justify-between">
            <div className="flex items-center justify-center">
              <Checkbox
                id={item.id}
                checked={!!checkedItems[item.id]}
                onChange={onCheckboxChange}
                aria-label={`Mark "${item.name}" as completed`}
              />
              <h3
                className={`ml-3 max-w-48 cursor-pointer truncate text-t-primary sm:max-w-full ${
                  checkedItems[item.id] ? 'line-through' : ''
                }`}
              >
                {item.name}
              </h3>
              <div className="absolute right-6 flex items-center gap-1 text-t-default sm:relative sm:right-0 sm:ml-3">
                <Image
                  src="/images/icons/ic_comment.svg"
                  alt="댓글"
                  width={16}
                  height={16}
                />
                {item.commentCount}
              </div>
            </div>
            <button>
              <Image
                src="/images/icons/ic_kebab.svg"
                alt="수정,삭제"
                width={16}
                height={16}
              />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/ic_calendar.svg"
                alt="달력"
                width={16}
                height={16}
              />
              <p className="text-sm text-t-default">
                {dayjs(item.date).format('YYYY년 MM월 DD일')}
              </p>
            </div>
            <div className="text-xs text-b-tertiary">|</div>
            <div className="flex items-center gap-2">
              {getFormattedFrequency(item.frequency) !== '한 번' && (
                <Image
                  src="/images/icons/ic_repeat.svg"
                  alt="반복"
                  width={16}
                  height={16}
                />
              )}
              <p className="text-sm text-t-default">
                {getFormattedFrequency(item.frequency)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
