'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { GroupResponseType } from '../types/group';
import { getGroups } from '../api/group.api';
import useUserStore from '../stores/userStore';

import TaskLists from './TaskLists';
import MemberList from './MemberList';
import Report from './Report';
import Modal, { ModalFooter } from '../components/Modal';
import Button from '../components/Button';
import Loading from '../components/Loading';
import GroupInfo from './GroupInfo';

export default function TeamPage() {
  const { teamid } = useParams();

  const [role, setRole] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [incorrectModal, setIncorrectModal] = useState(false);

  const { user } = useUserStore();
  const router = useRouter();

  const {
    data: group,
    isLoading,
    isError,
  } = useQuery<GroupResponseType['getGroups']>({
    queryKey: ['getGroupsById', teamid],
    queryFn: async () => await getGroups({ groupId: Number(teamid) }),
    enabled: !!teamid,
  });

  useEffect(() => {
    if (group) {
      // 사용자 검증 및 역할 받아 설정
      const member = group.members.find((member) => member.userId === user?.id);
      // console.log('--- member:', member);
      if (member) {
        setRole(member.role);
      } else {
        setIncorrectModal(true);
      }

      // 할 일 전체와 완료된 할 일 갯수 받기
      let total = 0;
      let complete = 0;
      group.taskLists.forEach((taskList) => {
        total += taskList.tasks.length;
        complete += taskList.tasks.filter(
          (task) => task.doneAt !== null
        ).length;
      });
      setTotalTasks(total);
      setCompletedTasks(complete);
    }
  }, [group, user]);

  // 팀 검증 실패 모달에서 메인페이지로 이동시킴
  const handleIncorrectModalClose = () => {
    router.replace('/');
  };

  if (isLoading) {
    return (
      <div className="mt-48">
        <Loading />
      </div>
    );
  }

  if (isError) {
    // TODO: 토스트로 에러 보여주시
    console.error('--- data fetch error');
    router.replace('/');
    return null;
  }

  // 팀 검증 실패 모달
  if (incorrectModal) {
    return (
      <Modal
        isOpen={incorrectModal}
        onClose={handleIncorrectModalClose}
        hasCloseButton={false}
        icon="danger"
        title="해당 팀의 멤버가 아닙니다."
      >
        <p className="text-center">메인페이지로 돌아갑니다.</p>
        <ModalFooter>
          <Button
            state="danger"
            onClick={handleIncorrectModalClose}
          >
            확인
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  if (!group) return null;

  return (
    <div className="container flex flex-col py-6">
      <GroupInfo {...group} />

      <TaskLists
        groupId={group.id}
        taskLists={group.taskLists}
      />

      {role === 'ADMIN' && (
        <Report
          total={totalTasks}
          complete={completedTasks}
        />
      )}

      <MemberList
        groupId={group.id}
        members={group.members}
        role={role}
      />
    </div>
  );
}
