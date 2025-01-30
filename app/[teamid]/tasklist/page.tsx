'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import ListHeader from './ListHeader';
import { getGroups } from '@/app/api/group.api';
import { GroupResponseType } from '@/app/types/group';

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

  const handleUpdateTrigger = () => setUpdateTrigger((prev) => !prev);

  const fetchGroupData = useCallback(async () => {
    try {
      const response = await getGroups({ groupId: Number(groupId) });
      const fetchedTaskLists = response.taskLists || [];
      setTaskLists(fetchedTaskLists);

      if (fetchedTaskLists.length > 0) {
        setSelectedTaskListId(fetchedTaskLists[0].id);
      }
    } catch (error) {
      console.error('그룹 데이터를 가져오는 중 오류 발생:', error);
    }
  }, [groupId]);

  useEffect(() => {
    if (groupId) {
      fetchGroupData();
    }
  }, [groupId, fetchGroupData]);

  return (
    <div className="container relative min-h-[700px]">
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
        <ListCategory
          selectedDate={selectedDate}
          taskLists={taskLists}
          groupId={Number(groupId)}
          updateTrigger={updateTrigger}
          onCategoryChange={(taskListId) => setSelectedTaskListId(taskListId)}
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
  );
}
