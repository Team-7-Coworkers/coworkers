'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import InputField from '../components/InputField';
import Button from '../components/Button';

import styles from '../styles/team.module.css';
import useUserStore from '../stores/userStore';
import { useMutation } from '@tanstack/react-query';
import { postGroupsAcceptInvitation } from '../api/group.api';

export default function InvitationPage() {
  const [link, setLink] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: (email: string) =>
      postGroupsAcceptInvitation({ userEmail: email, token: link }),
    onSuccess: (data) => {
      router.push(`/${data.groupId}`);
    },
    onError: (err) => {
      alert('팀 참여에 실패 하였습니다. 잠시 후 다시 시도해 주시요.');
      console.error('--- useMutation:err:', err);
    },
  });

  const token = searchParams.get('t');
  const validLink = link.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const GET_TOKEN_IDX = '?t=';
    const index = link.indexOf(GET_TOKEN_IDX);

    // input에 링크정보 들어왔을 경우 토큰정보로 변경
    if (link.startsWith('http') && index !== -1) {
      setLink((prev) => prev.slice(index + GET_TOKEN_IDX.length));
    }

    // 사용자 정보 확인
    if (!user) {
      alert(
        '사용자 정보를 가져오지 못했습니다. 잠시 뒤에 로그인 확인 후 다시 시도해 주세요.'
      );
      return;
    }
    mutate(user.email);
  };

  useEffect(() => {
    // input 에 토큰 정보 입력
    if (token) setLink(token);
  }, [token]);

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
    </div>
  );
}
