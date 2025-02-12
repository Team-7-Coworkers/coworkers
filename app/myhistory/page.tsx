'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserHistory } from '../api/user.api';
import { UserResponseType } from '../types/user';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
// import Loading from '../components/Loading';
import FilterDropdown from './FilterDropdown';

export default function MyHistoryPage() {
  // 정렬 기준 (doneAt, date)
  const [sortType, setSortType] = useState<'doneAt' | 'date'>('doneAt');

  //히스토리 가져오기
  const {
    data: userHistory,
    isLoading,
    isError,
  } = useQuery<UserResponseType['getUserHistory']>({
    queryKey: ['userHistory'],
    queryFn: async () => await getUserHistory(),
  });

  // 데이터 가공
  const groupedTasksByDate = useMemo(() => {
    if (
      !Array.isArray(userHistory?.tasksDone) ||
      userHistory?.tasksDone?.length === 0
    )
      return [];

    // 시간순 정렬 (doneAt, date에 따라 분기)
    const sortedTasks = [...userHistory.tasksDone].sort((a, b) => {
      const dateA = sortType === 'doneAt' ? a.doneAt : a.date;
      const dateB = sortType === 'doneAt' ? b.doneAt : b.date;

      return (
        (dateA ? new Date(dateA).getTime() : 0) -
        (dateB ? new Date(dateB).getTime() : 0)
      );
    });

    // 날짜별로 묶기
    const initialAcc: Record<string, { name: string; id: number }[]> = {};

    const groupedTasks = sortedTasks.reduce((acc, task) => {
      const key =
        (sortType === 'doneAt' ? task.doneAt : task.date)?.split('T')[0] || '';

      if (!acc[key]) acc[key] = [];
      acc[key].push({ name: task.name, id: task.id });

      return acc;
    }, initialAcc);

    // {날짜: 할 일 배열} 로 변환, 최신순으로 정렬
    return Object.entries(groupedTasks)
      .map(([key, tasks]) => ({
        date: dayjs(key).format('YYYY년 MM월 DD일'),
        tasks,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [userHistory, sortType]);

  if (isError) {
    alert('데이터를 받아오는 데 실패했습니다.');
  }

  return (
    <div className="container flex min-h-[80vh] flex-col">
      <h1 className="mt-6 text-2lg font-bold text-t-primary lg:mt-10">
        마이 히스토리
      </h1>
      {isLoading ? (
        <div className="mt-[60px] space-y-10">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="mb-4 h-[19px] w-[130px] animate-pulse rounded-lg bg-gray-500" />
              <div className="mb-4 h-11 w-full animate-pulse rounded-lg bg-gray-700" />
              <div className="mb-4 h-11 w-full animate-pulse rounded-lg bg-gray-700" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-700" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {groupedTasksByDate.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-md font-medium text-t-default">
                아직 히스토리가 없습니다.
              </p>
            </div>
          ) : (
            <FilterDropdown
              dailyTasks={groupedTasksByDate}
              sortType={sortType}
              setSortType={setSortType}
            />
          )}
        </>
      )}
    </div>
  );
}
