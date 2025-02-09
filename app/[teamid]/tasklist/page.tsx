'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import TaskDetail from './task-detail/TaskDetail';
import ListHeader from './ListHeader';
import { getGroups } from '@/app/api/group.api';
import CloseIcon from '@/app/components/Modal/CloseIcon';
import Loading from '@/app/components/Loading';
import Modal, { ModalFooter } from '@/app/components/Modal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useUserStore from '@/app/stores/userStore';
import { TaskListType } from '@/app/types/taskList';
import Button from '@/app/components/Button';
import { useTaskStore } from '@/app/stores/taskStore';

interface Member {
  userId: number;
  userName: string;
  userEmail: string;
  role: string;
}

interface GroupDataType {
  id: number;
  name: string;
  members: Member[];
  taskLists: TaskListType[];
}

export default function ListPage() {
  const { teamid: groupId } = useParams<{ teamid: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  ); // TODO: 전역 상태를 추가했으므로 해당 state 관련 작업들 리팩토링하기
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isMember, setIsMember] = useState(true);
  const router = useRouter();

  const { selectedCategory } = useTaskStore();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<GroupDataType, Error>({
    queryKey: ['groupTasks', groupId],
    queryFn: async () => {
      const response = await getGroups({ groupId: Number(groupId) });
      // 멤버의 아이디에 현재 로그인된 유저 아이디가 있는 지 판별
      if (user) {
        const isUserMember = response.members.some(
          (member) => member.userId === user.id
        );
        setIsMember(isUserMember);
      }
      return response;
    },
    enabled: !!groupId && !!user,
    initialData: () => queryClient.getQueryData(['groupTasks', groupId]),
  });

  const handleTaskUpdated = (taskListId: number) => {
    queryClient.invalidateQueries({ queryKey: ['tasks', taskListId] });
  };

  const handleListAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['groupTasks', groupId] });
  };

  const handleIncorrectModalClose = () => {
    router.push('/');
  };

  if (isLoading || !user) {
    // 로딩 코드
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    // 만약 에러 발생 시 보여줄 코드
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
    <div className="container relative min-h-[80vh] pb-10">
      <Modal
        isOpen={!isMember}
        title="해당 팀의 멤버가 아닙니다."
        onClose={handleIncorrectModalClose}
        hasCloseButton={false}
        icon="danger"
      >
        <p className="mt-5 text-center text-md font-semibold text-t-default">
          메인 페이지로 돌아갑니다.
        </p>
        <ModalFooter>
          <Button
            state="danger"
            onClick={handleIncorrectModalClose}
          >
            확인
          </Button>
        </ModalFooter>
      </Modal>

      {isMember && (
        <div className="w-full">
          <h1 className="mb-7 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
            할 일
          </h1>
          <ListHeader
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            groupId={Number(groupId)}
            onListAdded={handleListAdded}
          />
          <div className="mt-5 sm:mt-6 lg:mt-8">
            <ListCategory
              selectedDate={selectedDate}
              taskLists={data?.taskLists || []}
              groupId={Number(groupId)}
              onCategoryChange={(taskListId) =>
                setSelectedTaskListId(taskListId)
              }
              onTaskClick={(taskId) => setSelectedTaskId(taskId)}
            />
          </div>
          {groupId && selectedCategory !== null && (
            <AddButton
              groupId={Number(groupId)}
              taskListId={selectedCategory}
              onSaveSuccess={() => handleTaskUpdated(selectedCategory)}
            />
          )}
        </div>
      )}

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
              onTaskUpdated={() =>
                selectedTaskListId && handleTaskUpdated(selectedTaskListId)
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
