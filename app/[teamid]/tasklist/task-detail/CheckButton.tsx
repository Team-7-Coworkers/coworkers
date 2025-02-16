'use client';

import Button from '@/app/components/Button';
import CheckIcon from '../task-icon/CheckIcon';
import { patchGroupsTaskListsTasks } from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';
import { toast } from 'react-toastify';

interface CheckButtonProps {
  taskId: number;
  groupId: number;
  taskListId: number;
  onTaskUpdated: () => void;
}

export default function CheckButton({
  taskId,
  groupId,
  taskListId,
  onTaskUpdated,
}: CheckButtonProps) {
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
      onTaskUpdated();
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
