'use client';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import Dropdown from '../components/Dropdown';
import DailyItemList from './DailyItemList';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import Image from 'next/image';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

interface DailyTask {
  date: string;
  tasks: { name: string; id: number }[];
}

type FilteredTasksProps = {
  dailyTasks: DailyTask[];
  sortType: 'doneAt' | 'date';
  setSortType: (sortType: 'doneAt' | 'date') => void;
};

export default function FilterDropdown({
  dailyTasks,
  sortType,
  setSortType,
}: FilteredTasksProps) {
  const [filterType, setFilterType] = useState<'week' | 'month' | 'year' | ''>(
    ''
  );
  const [dropdownText, setDropdownText] = useState('모든 날짜');

  const filteredTaskList = useMemo(() => {
    if (!filterType) return dailyTasks;

    const now = dayjs();
    let filteredTasks = dailyTasks;

    // date(전달한 날짜)으로 필터링, 일주일 전(subtract) 이후(isAfter)
    if (filterType === 'week') {
      const oneWeekAgo = now.subtract(1, 'week');
      filteredTasks = dailyTasks.filter(({ date }) =>
        dayjs(date, 'YYYY년 MM월 DD일').isBetween(oneWeekAgo, now, null, '[]')
      );
    } else if (filterType === 'month') {
      const oneMonthAgo = now.subtract(1, 'month');
      filteredTasks = dailyTasks.filter(({ date }) =>
        dayjs(date, 'YYYY년 MM월 DD일').isBetween(oneMonthAgo, now, null, '[]')
      );
    } else if (filterType === 'year') {
      const oneYearAgo = now.subtract(1, 'year');
      filteredTasks = dailyTasks.filter(({ date }) =>
        dayjs(date, 'YYYY년 MM월 DD일').isBetween(oneYearAgo, now, null, '[]')
      );
    }

    // 정렬 기준에 따른 정렬
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      const dateA = sortType === 'doneAt' ? a.date : a.date; // date 기준에 맞게
      const dateB = sortType === 'doneAt' ? b.date : b.date;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    return sortedTasks;
  }, [dailyTasks, filterType, sortType]);

  const handleFilterChange = (
    type: '' | 'week' | 'month' | 'year',
    text: string
  ) => {
    setFilterType(type);
    setDropdownText(text);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div className="" />
        <div className="flex gap-2">
          <Dropdown>
            <Dropdown.Button className="flex w-full cursor-pointer items-center rounded-[11px] border-none bg-b-secondary px-4 py-3 text-md transition-all duration-200 hover:bg-b-tertiary">
              {sortType === 'doneAt' ? '완료한 날짜' : '목표 날짜'}{' '}
              <Image
                src="/images/icons/ic_toggle.svg"
                alt=""
                width={20}
                height={20}
                className="ml-1"
              />
            </Dropdown.Button>
            <Dropdown.Menu
              className="top-12 w-full"
              animationType="slide"
            >
              <Dropdown.MenuItem onClick={() => setSortType('doneAt')}>
                완료한 날짜
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => setSortType('date')}>
                목표 날짜
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button
              className={`flex w-full cursor-pointer items-center rounded-[11px] border-none bg-b-secondary px-4 py-3 text-md transition-all duration-200 hover:bg-b-tertiary`}
            >
              {dropdownText}{' '}
              <Image
                src="/images/icons/ic_toggle.svg"
                alt=""
                width={20}
                height={20}
                className="ml-1"
              />
            </Dropdown.Button>
            <Dropdown.Menu
              animationType="slide"
              className="top-12 w-full"
            >
              <Dropdown.MenuItem
                onClick={() => handleFilterChange('', '모든 날짜')}
              >
                모든 날짜
              </Dropdown.MenuItem>
              <Dropdown.MenuItem
                onClick={() => handleFilterChange('week', '지난 1주')}
              >
                지난 1주
              </Dropdown.MenuItem>
              <Dropdown.MenuItem
                onClick={() => handleFilterChange('month', '지난 1개월')}
              >
                지난 1개월
              </Dropdown.MenuItem>
              <Dropdown.MenuItem
                onClick={() => handleFilterChange('year', '지난 1년')}
              >
                지난 1년
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <DailyItemList dailyTasks={filteredTaskList} />
    </div>
  );
}
