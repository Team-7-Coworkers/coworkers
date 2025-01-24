import Image from 'next/image';
import Checkbox from './Checkbox';

type Item = {
  // 타입은 후에 api로 변경하면서 적당히 수정하겠습니다
  id: number;
  category: string;
  title: string;
  comments: number;
  date: string;
  frequency: string;
};

type ItemListProps = {
  items: Item[];
  checkedItems: { [key: number]: boolean };
  onCheckboxChange: (id: number) => void;
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
                aria-label={`Mark "${item.title}" as completed`}
              />
              <h3
                className={`ml-3 max-w-48 cursor-pointer truncate text-t-primary sm:max-w-full ${
                  checkedItems[item.id] ? 'line-through' : ''
                }`}
              >
                {item.title}
              </h3>
              <div className="absolute right-6 flex items-center gap-1 text-t-default sm:relative sm:right-0 sm:ml-3">
                <Image
                  src="/images/icons/ic_comment.svg"
                  alt="댓글"
                  width={16}
                  height={16}
                />
                {item.comments}
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
              <p className="text-sm text-t-default">{item.date}</p>
            </div>
            <div className="text-xs text-b-tertiary">|</div>
            <div className="flex items-center gap-2">
              {item.frequency !== '한 번' && (
                <Image
                  src="/images/icons/ic_repeat.svg"
                  alt="반복"
                  width={16}
                  height={16}
                />
              )}
              <p className="text-sm text-t-default">{item.frequency}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
