'use client';

import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { patchGroupsTaskListsTasks } from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';
import Button from '@/app/components/Button';
import CheckIcon from '../task-icon/CheckIcon';

interface CheckButtonProps {
  taskId: number;
  groupId: number;
  taskListId: number;
}

export default function CheckButton({
  taskId,
  groupId,
  taskListId,
}: CheckButtonProps) {
  const queryClient = useQueryClient();
  const { checkedItems, toggleChecked } = useTaskStore();
  const isCompleted = !!checkedItems[taskId];

  const handleComplete = async () => {
    try {
      await patchGroupsTaskListsTasks({
        groupId,
        taskListId,
        taskId,
        done: !isCompleted,
      });
      toggleChecked(taskId, !isCompleted);
      queryClient.invalidateQueries({ queryKey: ['userHistory'] });
    } catch (error) {
      console.error('완료 처리 실패:', error);
      toast.error('완료 처리에 실패하였습니다.');
    }
  };

  return (
    <div className="lg:right-35 absolute bottom-5 right-3">
      <Button
        styleType={isCompleted ? 'outlined' : 'solid'}
        state="floating"
        size="w-[125px] h-[48px] flex gap-1 items-center justify-center"
        onClick={handleComplete}
      >
        {isCompleted ? null : <CheckIcon classname="w-4 h-4" />}
        {isCompleted ? '완료 취소하기' : '완료하기'}
      </Button>
    </div>
  );
}
