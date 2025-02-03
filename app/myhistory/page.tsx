'use client';

import DailyItemList from './DailyItemList';
import { useQuery } from '@tanstack/react-query';
import { getUserHistory } from '../api/user.api';
import { UserResponseType } from '../types/user';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import Loading from '../components/Loading';

export default function MyHistoryPage() {
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
    if (!userHistory) return [];

    // 시간순 정렬
    const sortedTasks = [...userHistory.tasksDone].sort(
      (a, b) => new Date(a.doneAt).getTime() - new Date(b.doneAt).getTime()
    );

    // 날짜별로 묶기
    const groupedTasks = sortedTasks.reduce(
      (acc, task) => {
        const doneDate = task.doneAt.split('T')[0];

        if (!acc[doneDate]) acc[doneDate] = [];
        acc[doneDate].push(task.name);

        return acc;
      },
      {} as Record<string, string[]>
    );

    // {날짜: 할 일 배열} 로 변환, 최신순으로 정렬
    return Object.entries(groupedTasks)
      .map(([doneAt, names]) => ({
        doneAt: dayjs(doneAt).format('YYYY년 MM월 DD일'),
        names,
      }))
      .sort((a, b) => b.doneAt.localeCompare(a.doneAt));
  }, [userHistory]);

  // 로딩 및 에러 처리
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    alert('데이터를 받아오는 데 실패했습니다.');
  }

  return (
    <div className="container">
      <h1 className="my-6 text-2lg font-bold text-t-primary lg:mt-10">
        마이 히스토리
      </h1>
      {/* 데이터 있을 때 / 없을 때 */}
      <DailyItemList dailyTasks={groupedTasksByDate} />
    </div>
  );
}
