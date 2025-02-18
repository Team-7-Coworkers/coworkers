'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

import { postGroupsAcceptInvitation } from '../api/group.api';
import useUserStore from '../stores/userStore';
import { TOAST_CLOSE_TIME } from '@constants/times';

import InputField from '../components/InputField';
import Button from '../components/Button';
import Loading from '../components/Loading';

import styles from '../styles/team.module.css';
import useTeamStore from '../stores/teamStore';
import Modal, { ModalFooter } from '@components/Modal';

const InvitationContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('t');

  const [link, setLink] = useState(token || '');
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useUserStore();
  const { currentTeam, setCurrentTeam } = useTeamStore();

  const validLink = link.length > 0;

  const { mutate } = useMutation({
    mutationFn: async (email: string) =>
      await postGroupsAcceptInvitation({ userEmail: email, token: link }),
    onSuccess: (data) => {
      toast.success('팀에 성공적으로 참여하셨습니다.', {
        autoClose: TOAST_CLOSE_TIME.success,
      });

      queryClient.invalidateQueries({
        queryKey: ['coworkers-teamList', 'getGroupsById', user?.id],
      });

      if (currentTeam?.id === data.groupId) {
        setCurrentTeam(data.groupId);
      }

      router.push(`/${data.groupId}`);
    },
    onError: (err) => {
      console.error('--- useMutation:err:', err);
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
        setModal(true);
      } else {
        toast.error('팀 참여에 실패 하였습니다. 잠시 후 다시 시도해 주시요.');
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const GET_TOKEN_IDX = 't=';
    const index = link.indexOf(GET_TOKEN_IDX);

    // input에 링크정보 들어왔을 경우 토큰정보로 변경
    if (link.startsWith('http') && index !== -1) {
      setLink((prev) => prev.slice(index + GET_TOKEN_IDX.length));
    }

    // 사용자 정보 확인
    if (!user) {
      toast.error(
        '사용자 정보를 가져오지 못했습니다. 잠시 뒤에 로그인 확인 후 다시 시도해 주세요.'
      );
      router.push('/');
      return;
    }
    mutate(user.email);
  };

  return (
    <div className={styles.area}>
      <h1 className={styles.title}>팀 참여하기</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="link"
          className={styles.label}
        >
          팀 이름
        </label>
        <InputField
          id="link"
          type="text"
          value={link || ''}
          placeholder="팀 링크를 입력해주세요."
          onChange={(e) => setLink(e.target.value)}
        />

        <Button
          type="submit"
          classname="w-full mt-10"
          disabled={!validLink}
        >
          참여하기
        </Button>
        <div className={styles.help}>
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </div>
      </form>

      <Modal
        isOpen={modal}
        icon="danger"
        title={errorMessage}
        onClose={() => setModal(false)}
      >
        <p className="text-center">메인페이지로 돌아갑니다.</p>
        <ModalFooter>
          <Button
            href="/"
            state="danger"
          >
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default function InvitationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <InvitationContent />
    </Suspense>
  );
}
