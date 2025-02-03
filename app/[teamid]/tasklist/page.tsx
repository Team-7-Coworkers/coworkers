'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import TaskDetail from './task-detail/TaskDetail';
import ListHeader from './ListHeader';
import { getGroups } from '@/app/api/group.api';
import { GroupResponseType } from '@/app/types/group';
import CloseIcon from '@/app/components/Modal/CloseIcon';

export default function ListPage() {
  const { teamid: groupId } = useParams<{ teamid: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [taskLists, setTaskLists] = useState<
    GroupResponseType['getGroups']['taskLists']
  >([]);
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  );
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateTrigger = () => setUpdateTrigger((prev) => !prev);

  const fetchGroupData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getGroups({ groupId: Number(groupId) });
      const fetchedTaskLists = response.taskLists || [];
      setTaskLists(fetchedTaskLists);

      if (fetchedTaskLists.length > 0) {
        setSelectedTaskListId(fetchedTaskLists[0].id);
      }
    } catch (error) {
      console.error('그룹 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    if (groupId) {
      fetchGroupData();
    }
  }, [groupId, fetchGroupData]);

  if (isLoading) {
    return (
      <p className="mt-50 text-center text-md font-medium text-t-default">
        로딩 중...
      </p>
    );
  } //TODO: 임시 로딩

  return (
    <div className="container relative min-h-[80vh]">
      <div className="w-full">
        <h1 className="mb-10 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
          할 일
        </h1>
        <ListHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          groupId={Number(groupId)}
          onListAdded={fetchGroupData}
        />
        <div className="mt-5 sm:mt-6 lg:mt-8">
          {/*TODO: 할 일들 순서 바꾸기? 드래그앤드롭? */}
          <ListCategory
            selectedDate={selectedDate}
            taskLists={taskLists}
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

      {selectedTaskId && ( //TODO: 애니메이션 추가
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
