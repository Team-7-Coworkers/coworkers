import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchGroupsTaskListTasksOrder } from '@/app/api/task.api';
import { TaskType } from '@/app/types/shared';
import { DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

export function useTaskReorder(taskListId: number, groupId: number) {
  const queryClient = useQueryClient();
  const [isReordering, setIsReordering] = useState(false);

  const reorderMutation = useMutation({
    mutationFn: async (params: {
      groupId: number;
      taskListId: number;
      taskId: number;
      displayIndex: number;
    }) => patchGroupsTaskListTasksOrder(params),

    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({
        queryKey: ['tasks', newOrder.taskListId],
      });

      // 드래그 전 기존 할 일을 저장
      const previousTasks =
        queryClient.getQueryData<TaskType[]>(['tasks', newOrder.taskListId]) ||
        [];

      const updatedTasks = previousTasks.map((task) =>
        task.id === newOrder.taskId
          ? { ...task, displayIndex: newOrder.displayIndex }
          : task
      );

      queryClient.setQueryData(['tasks', newOrder.taskListId], updatedTasks);

      return { previousTasks, taskListId: newOrder.taskListId };
    },

    onError: (_, __, context) => {
      // 에러 발생 시 이전 데이터 백업
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ['tasks', context.taskListId],
          context.previousTasks
        );
      }
    },

    onSettled: (_, __, ___, context) => {
      // 최신 데이터 가져오기
      if (context?.taskListId) {
        queryClient.invalidateQueries({
          queryKey: ['tasks', context.taskListId],
        });
      }
    },
  });

  const handleDragEnd = (result: DropResult, items: TaskType[]) => {
    if (!result.destination || !items) return;

    const sourceIndex = result.source.index; // 원래 위치
    const destinationIndex = result.destination.index; // 사용자가 놓을 위치

    if (sourceIndex === destinationIndex) return; // 드래그를 같은 위치에 두어 순서 변경이 없을 때

    const movedItem = items[sourceIndex];

    setIsReordering(true);

    reorderMutation.mutate(
      {
        groupId,
        taskListId,
        taskId: movedItem.id,
        displayIndex: destinationIndex,
      },
      {
        onSettled: () => {
          setTimeout(() => {
            setIsReordering(false);
          }, 300);
        },
      }
    );
  };

  return { isReordering, handleDragEnd };
}
