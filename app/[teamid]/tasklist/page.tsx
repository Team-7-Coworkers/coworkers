'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import TaskDetail from './task-detail/TaskDetail';
import ListHeader from './ListHeader';
import { getGroups } from '@/app/api/group.api';
import CloseIcon from '@/app/components/Modal/CloseIcon';
import Loading from '@/app/components/Loading';
import { useQuery } from '@tanstack/react-query';

export default function ListPage() {
  const { teamid: groupId } = useParams<{ teamid: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  );
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleUpdateTrigger = () => setUpdateTrigger((prev) => !prev);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['groupTasks', groupId, updateTrigger],
    queryFn: async () => {
      const response = await getGroups({ groupId: Number(groupId) });
      return response.taskLists || [];
    },
    enabled: !!groupId,
  });

  useState(() => {
    if (data && data.length > 0 && !selectedTaskListId) {
      setSelectedTaskListId(data[0].id);
    }
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-danger">
          데이터를 불러오는 중 오류가 발생했습니다. <br />
          다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="container relative min-h-[80vh]">
      <div className="w-full">
        <h1 className="mb-7 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
          할 일
        </h1>
        <ListHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          groupId={Number(groupId)}
          onListAdded={refetch}
        />
        <div className="mt-5 sm:mt-6 lg:mt-8">
          <ListCategory
            selectedDate={selectedDate}
            taskLists={data || []}
            groupId={Number(groupId)}
            updateTrigger={updateTrigger}
            onCategoryChange={(taskListId) => setSelectedTaskListId(taskListId)}
            onTaskClick={(taskId) => setSelectedTaskId(taskId)}
          />
        </div>
        {groupId && selectedTaskListId && (
          <AddButton
            groupId={Number(groupId)}
            taskListId={selectedTaskListId}
            onSaveSuccess={handleUpdateTrigger}
          />
        )}
      </div>

      {selectedTaskId && (
        <div className="z-1 container fixed right-0 top-[60px] h-[calc(100vh-60px)] w-full translate-x-0 transform overflow-y-auto border border-bd-primary/10 bg-b-secondary text-white shadow-xl transition-transform sm:w-1/2">
          <button
            onClick={() => setSelectedTaskId(null)}
            className="mt-8 text-ic-primary"
          >
            <CloseIcon classname="w-6 h-6" />
          </button>
          <TaskDetail
            taskId={selectedTaskId}
            groupId={Number(groupId)}
            taskListId={selectedTaskListId || 0}
            onClose={() => setSelectedTaskId(null)}
          />
        </div>
      )}
    </div>
  );
}
