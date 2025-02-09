import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import type { GroupType } from '../types/shared';
import useUserStore from '../stores/userStore';
import useTeamStore from '../stores/teamStore';
import { deleteGroups } from '../api/group.api';

import Dropdown from '../components/Dropdown';
import Modal, { ModalFooter } from '../components/Modal';
import Button from '../components/Button';

import GearIcon from '../components/icons/GearIcon';
import styles from './teampage.module.css';

export default function GroupInfo({ id, name, image }: GroupType) {
  const [modal, setModal] = useState(false);

  const router = useRouter();
  const { user } = useUserStore();
  const { teamList, setCurrentTeam, clearTeam } = useTeamStore();
  const queryClient = useQueryClient();

  const bgImage = image ? { backgroundImage: `url(${image})` } : {};

  // 팀 수정하기 버튼 클릭 함수
  const handleModifyClick = () => {
    router.push(`/${id}/modify`);
  };

  // 팀 삭제하기 버튼 클릭
  const handleDeleteClick = () => {
    setModal(true);
  };

  // 팀 진짜로 삭제하기 버튼 클릭
  const handleRealDeleteClick = async () => {
    const result = await deleteGroups({ groupId: id });

    if (teamList.length)
      await queryClient.refetchQueries({
        queryKey: ['coworkers-teamList', user?.id],
      });

    // 최신화된 팀 데이터 확인
    const updatedTeamList =
      queryClient.getQueryData<GroupType[]>(['coworkers-teamList', user?.id]) ||
      [];

    if (updatedTeamList.length > 0) {
      // 팀이 남아있다면 첫 번째 팀을 현재 팀으로 설정
      setCurrentTeam(updatedTeamList[0].id);
    } else {
      // 팀이 없다면 currentTeam을 null로 초기화
      clearTeam();
    }

    console.log('--- deleteGroups:result:', result);
    router.replace('/');
  };

  // 모달 닫기
  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <header
      className={styles.header}
      style={bgImage}
    >
      <h1 className={styles.headerTitle}>
        {name}({id})
      </h1>

      <Dropdown className="z-10 h-6">
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

      <Modal
        isOpen={modal}
        title="팀을 정말로 삭제하실 건가요?"
        onClose={handleModalClose}
        icon="danger"
      >
        <p className="text-pretty break-keep text-center">
          모든 할 일 목록 및 할 일은 삭제처리 됩니다.
        </p>

        <ModalFooter>
          <Button
            styleType="outlined-secondary"
            onClick={handleModalClose}
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
    </header>
  );
}
