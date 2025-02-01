'use client';

import Button from '@/app/components/Button';
import CheckIcon from './CheckIcon';
import { patchGroupsTaskListsTasks } from '@/app/api/task.api';
import { useTaskStore } from '@/app/stores/taskStore';

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
    } catch (error) {
      console.error('완료 처리 실패:', error);
      alert('완료 처리에 실패했습니다.');
    }
  };

  return (
    <div>
      <Button
        styleType={isCompleted ? 'outlined' : 'solid'}
        state="floating"
        size="w-[125px] h-[48px] absolute bottom-5 lg:right-35 right-5 flex gap-1 items-center justify-center"
        onClick={handleComplete}
      >
        <CheckIcon classname="w-4 h-4" />
        {isCompleted ? '완료 취소하기' : '완료하기'}
      </Button>
    </div>
  );
}
