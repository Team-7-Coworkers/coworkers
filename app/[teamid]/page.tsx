'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GroupType } from '../types/shared';
import { getGroups, deleteGroups } from '../api/group.api';
import useUserStore from '../stores/userStore';
import { GroupResponseType } from '../types/group';

import TaskLists from './TaskLists';
import MemberList from './MemberList';
import Report from './Report';
import Dropdown from '../components/Dropdown';
import Modal, { ModalFooter } from '../components/Modal';
import Button from '../components/Button';
import Loading from '../components/Loading';

import GearIcon from '../components/icons/GearIcon';
import styles from './teampage.module.css';
import useTeamStore from '../stores/teamStore';

export default function TeamPage() {
  const { teamid } = useParams();

  const [role, setRole] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [incorrectModal, setIncorrectModal] = useState(false);

  const { user } = useUserStore();
  const { teamList, setCurrentTeam, clearTeam } = useTeamStore();

  const router = useRouter();
  const queryClient = useQueryClient();

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
  }, [group, user, router]);

  // 그룹 이미지를 배경 이미지로
  const bgImage = group?.image
    ? { backgroundImage: `url(${group.image})` }
    : {};

  // 팀 수정하기 버튼 클릭 함수
  const handleModifyClick = () => {
    router.push(`/${group?.id}/modify`);
  };

  // 팀 삭제하기 버튼 클릭
  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  // 팀 진짜로 삭제하기 버튼 클릭
  const handleRealDeleteClick = async () => {
    if (group) {
      const result = await deleteGroups({ groupId: group.id });

      if (teamList.length)
        await queryClient.refetchQueries({
          queryKey: ['coworkers-teamList', user?.id],
        });

      // 최신화된 팀 데이터 확인
      const updatedTeamList =
        queryClient.getQueryData<GroupType[]>([
          'coworkers-teamList',
          user?.id,
        ]) || [];

      if (updatedTeamList.length > 0) {
        // 팀이 남아있다면 첫 번째 팀을 현재 팀으로 설정
        setCurrentTeam(updatedTeamList[0].id);
      } else {
        // 팀이 없다면 currentTeam을 null로 초기화
        clearTeam();
      }

      console.log('--- deleteGroups:result:', result);
      router.replace('/');
    }
  };

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
      <header
        className={styles.header}
        style={bgImage}
      >
        <h1 className={styles.headerTitle}>
          {group.name}({group.id})
        </h1>

        <Dropdown className="h-6">
          <Dropdown.Button>
            <GearIcon />
          </Dropdown.Button>
          <Dropdown.Menu className="right-0">
            <Dropdown.MenuItem onClick={handleModifyClick}>
              수정하기
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={handleDeleteClick}>
              삭제하기
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </header>

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

      <Modal
        isOpen={deleteModal}
        title="팀을 정말로 삭제하실 건가요?"
        onClose={() => setDeleteModal(false)}
        icon="danger"
      >
        <p className="text-pretty break-keep text-center">
          모든 할 일 목록 및 할 일은 삭제처리 됩니다.
        </p>

        <ModalFooter>
          <Button
            styleType="outlined-secondary"
            onClick={() => setDeleteModal(false)}
          >
            취소
          </Button>

          <Button
            state="danger"
            onClick={handleRealDeleteClick}
          >
            팀 삭제
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
