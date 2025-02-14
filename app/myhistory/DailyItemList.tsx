import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '@/app/components/Modal/CloseIcon';
import TaskDetail from '@/app/[teamid]/tasklist/task-detail/TaskDetail';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface DailyTask {
  date: string;
  tasks: { name: string; id: number }[];
}

type DailyItemListProps = {
  dailyTasks: DailyTask[];
};

export default function DailyItemList({ dailyTasks }: DailyItemListProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const { teamid: groupId } = useParams<{ teamid: string }>();
  const queryClient = useQueryClient();

  const selectedTaskListId = null;

  const handleTaskUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ['userHistory'] });
  };

  return (
    <div className="mb-10 flex flex-col gap-10">
      {dailyTasks?.map(({ date, tasks }) => (
        <div key={date}>
          <h3 className="mb-4 text-lg font-medium text-t-primary">{date}</h3>
          <div className="flex flex-col gap-4">
            {tasks.map(({ name, id }) => {
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-lg bg-b-secondary px-[14px] py-[10px]"
                >
                  <Image
                    src="/images/icons/ic_checked-box.svg"
                    alt="완료 체크"
                    width={24}
                    height={24}
                  />
                  <p
                    className="cursor-pointer truncate text-md font-normal text-t-primary line-through transition-transform duration-200 ease-in-out hover:scale-105"
                    onClick={() => setSelectedTaskId(id)}
                  >
                    {name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {selectedTaskId && ( // 상세페이지
        <>
          <div // 상세 페이지 바깥 영역을 반투명하게 설정 후 클릭 시 상세 페이지가 닫히도록
            className="fixed inset-0 hidden bg-b-primary/50 sm:block"
            onClick={() => setSelectedTaskId(null)}
          ></div>

          {/* 상세 페이지 절반 */}
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
              onTaskUpdated={() => handleTaskUpdated()}
            />
          </div>
        </>
      )}
    </div>
  );
}
