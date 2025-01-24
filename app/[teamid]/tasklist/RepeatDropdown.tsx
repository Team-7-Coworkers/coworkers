import Dropdown from '@/app/components/Dropdown';
import useToggle from '@/app/hooks/useToggle';
import Image from 'next/image';
import { useState } from 'react';

export interface RepeatDropdownProps {
  onSelectRepeatOption: (option: string) => void;
}

export default function RepeatDropdown({
  onSelectRepeatOption,
}: RepeatDropdownProps) {
  const dropdown = useToggle();
  const [selectedValue, setSelectedValue] = useState('반복 안함');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelectRepeatOption(value);
    dropdown.setFalse();
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="mt-5">
      <label
        htmlFor="repeat-setting"
        className="text-lg font-medium text-t-primary"
      >
        반복 설정
      </label>
      <div className="mt-3">
        <Dropdown onClose={dropdown.setFalse}>
          <Dropdown.Button onClick={dropdown.toggle}>
            <div className="flex h-11 w-[110px] cursor-pointer items-center justify-center gap-1 rounded-[11px] bg-b-primary px-[10px] pb-[11px] pt-[12px] text-md font-medium text-t-default">
              {selectedValue}
              <Image
                src="/images/icons/ic_down-arrow.svg"
                alt="아래 화살표"
                width={24}
                height={24}
              />
            </div>
          </Dropdown.Button>
          {dropdown.state && (
            <Dropdown.Menu
              className="top-[50px] w-[110px]"
              isOpen={dropdown.state}
              animationType="slide"
            >
              <Dropdown.MenuItem onClick={() => handleSelect('한 번')}>
                한 번
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleSelect('매일')}>
                매일
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleSelect('주 반복')}>
                주 반복
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleSelect('월 반복')}>
                월 반복
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
      {selectedValue === '주 반복' && (
        <div className="mt-5">
          <label
            htmlFor="repeat-days"
            className="text-lg font-medium text-t-primary"
          >
            반복 요일
          </label>
          <div className="mt-3 flex gap-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <button
                key={day}
                type="button"
                className={`flex h-12 w-10 items-center justify-center rounded-xl font-medium ${
                  selectedDays.includes(day)
                    ? 'bg-primary text-t-primary'
                    : 'bg-b-primary text-t-default'
                }`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
