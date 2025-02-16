import Dropdown from '@/app/components/Dropdown';
import { TaskParamsType } from '@/app/types/task';
import Image from 'next/image';
import { useState } from 'react';

interface RepeatDropdownProps {
  onSelectRepeatOption: (
    option: TaskParamsType['postGroupsTaskListsTasks']['frequencyType'],
    days?: number[]
  ) => void;
}

export default function RepeatDropdown({
  onSelectRepeatOption,
}: RepeatDropdownProps) {
  const [selectedValue, setSelectedValue] = useState('반복 안함');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const dayToNumberMap: { [key: string]: number } = {
    일: 0,
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
  };

  const repeatOptionMap: {
    [key: string]: TaskParamsType['postGroupsTaskListsTasks']['frequencyType'];
  } = {
    '한 번': 'ONCE',
    '매일 반복': 'DAILY',
    '주 반복': 'WEEKLY',
    '월 반복': 'MONTHLY',
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);

    const mappedValue = repeatOptionMap[value];
    if (!mappedValue) return;

    if (mappedValue === 'WEEKLY') {
      onSelectRepeatOption(
        mappedValue,
        selectedDays.map((day) => dayToNumberMap[day])
      );
    } else {
      onSelectRepeatOption(mappedValue);
    }
  };

  const toggleDay = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);

    if (selectedValue === '주 반복') {
      onSelectRepeatOption(
        'WEEKLY',
        updatedDays.map((d) => dayToNumberMap[d])
      );
    }
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
        <Dropdown className="w-[110px]">
          <Dropdown.Button className="w-full">
            <div className="flex h-11 cursor-pointer items-center justify-center gap-1 rounded-[11px] bg-b-primary px-[10px] pb-[11px] pt-[12px] text-md font-medium text-t-default">
              {selectedValue}
              <Image
                src="/images/icons/ic_down-arrow.svg"
                alt="아래 화살표"
                width={24}
                height={24}
              />
            </div>
          </Dropdown.Button>
          <Dropdown.Menu
            className="top-[50px] w-full"
            animationType="slide"
          >
            {Object.keys(repeatOptionMap).map((label) => (
              <Dropdown.MenuItem
                key={label}
                onClick={() => handleSelect(label)}
              >
                {label}
              </Dropdown.MenuItem>
            ))}
          </Dropdown.Menu>
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
