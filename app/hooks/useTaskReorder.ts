import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchGroupsTaskListTasksOrder } from '@/app/api/task.api';
import { TaskType } from '@/app/types/shared';
import { DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import { TaskListType } from '../types/taskList';

export function useTaskReorder(
  taskListId: number,
  groupId: number,
  selectedDate: string
) {
  const queryClient = useQueryClient();
  const [isReordering, setIsReordering] = useState(false);

  const TASKS_QUERY_KEY = (
    groupId: number,
    taskListId: number,
    date: string
  ) => ['tasks', groupId, taskListId, date];

  const reorderMutation = useMutation({
    mutationFn: async (params: {
      groupId: number;
      taskListId: number;
      taskId: number;
      displayIndex: number;
    }) => patchGroupsTaskListTasksOrder(params),

    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({
        queryKey: TASKS_QUERY_KEY(groupId, newOrder.taskListId, selectedDate),
      });

      const previousGroupTasks = queryClient.getQueryData<{
        taskLists: TaskListType[];
      }>(['groupTasks', groupId]);

      const previousTasks =
        queryClient.getQueryData<TaskType[]>(
          TASKS_QUERY_KEY(groupId, newOrder.taskListId, selectedDate)
        ) ?? [];

      console.log('변경 전 tasks:', previousTasks);

      const updatedTasks = previousTasks.length
        ? previousTasks.map((task) =>
            task.id === newOrder.taskId
              ? { ...task, displayIndex: newOrder.displayIndex }
              : task
          )
        : previousTasks;

      if (updatedTasks.length > 0) {
        queryClient.setQueryData(
          TASKS_QUERY_KEY(groupId, newOrder.taskListId, selectedDate),
          updatedTasks
        );
      } else {
        console.warn('업데이트할 데이터 x');
      }

      if (previousGroupTasks) {
        const updatedGroupTasks = {
          ...previousGroupTasks,
          taskLists: previousGroupTasks.taskLists.map((list) =>
            list.id === newOrder.taskListId
              ? { ...list, tasks: updatedTasks }
              : list
          ),
        };

        queryClient.setQueryData(['groupTasks', groupId], updatedGroupTasks);
      }

      console.log('변경 후(정렬x) tasks:', updatedTasks);

      return {
        previousTasks,
        taskListId: newOrder.taskListId,
        previousGroupTasks,
      };
    },

    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          TASKS_QUERY_KEY(groupId, context.taskListId, selectedDate),
          [...context.previousTasks]
        );
      }
      if (context?.previousGroupTasks) {
        queryClient.setQueryData(
          ['groupTasks', groupId],
          context.previousGroupTasks
        );
      }
    },

    onSettled: (_, __, ___, context) => {
      if (context?.taskListId) {
        queryClient.invalidateQueries({
          queryKey: TASKS_QUERY_KEY(groupId, context.taskListId, selectedDate),
          refetchType: 'active',
        });
      }
    },
  });

  const handleDragEnd = (result: DropResult, items: TaskType[]) => {
    if (!result.destination || !items) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const movedItem = items[sourceIndex];

    const reorderedTasks = [...items];
    reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedItem);

    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      displayIndex: index,
    }));

    console.log('변경 후 (정렬o) tasks:', updatedTasks);

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
