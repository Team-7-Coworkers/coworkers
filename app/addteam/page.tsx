'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postGroups } from '../api/group.api';
import useTeamStore from '../stores/teamStore';
import useUserStore from '../stores/userStore';
import { MAX_LENGTH } from '../constants/form';

import InputField from '../components/InputField';
import ImageUpload from '../components/ImageUpload';
import Button from '../components/Button';

import styles from '../styles/team.module.css';

const MIN_NAME_LENGTH = 2;

export default function AddTeamPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const router = useRouter();
  const { user } = useUserStore();
  const { teamList } = useTeamStore();

  // 최소 2글자 이상인지 확인
  const validName = name.trim().length >= MIN_NAME_LENGTH;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!image) return await postGroups({ name });
      else return await postGroups({ name, image });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['coworkers-teamList', user?.id],
      });

      // TODO: 토스로 변경
      alert('팀을 생성하였습니다.');

      router.push(`/${data.id}`);
    },
    onError: (err) => {
      console.error('--- postGroup: err:', err);
      // TODO: 모달이나 토스 팀 이름인 경우 setNameErrorMessage
      alert('팀 생성에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  // 팀 생성 폼 서브및
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 같은 이름이 있는지 여부
    const findTeamIndex = teamList.findIndex((group) => group.name === name);

    // disabled 에서 걸러지긴 하지만 그래도 넣어둠
    if (!validName) {
      setNameErrorMessage('팀 이름을 최소 2글자 이상 작성하셔야 합니다.');
      return;
    }

    // 이름 중복 여부에 따른 처리
    if (findTeamIndex > 0) {
      setNameErrorMessage('이미 존재하는 이름입니다.');
      return;
    }

    mutate();
  };

  // 이미지 업로드 성공시
  const handleImageUploadSuccess = (url: string) => {
    // console.log('--- handleImageUploadSuccess:', url);
    setImage(url);
  };

  // 이미지 업로드 실패시
  const handleImageUploadError = (err: Error) => {
    console.error('--- handleImageUploadError:', err);
    setImageErrorMessage('이미지 업로드에 실패하였습니다.');
  };

  return (
    <div className={styles.area}>
      <h1 className={styles.title}>팀 생성하기</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.wrapImageUpload}>
          <label className={styles.label}>팀 프로필</label>
          <ImageUpload
            onUploadSuccess={handleImageUploadSuccess}
            onUploadError={handleImageUploadError}
          />
          {imageErrorMessage && (
            <div className={styles.errorMessage}>{imageErrorMessage}</div>
          )}
        </div>

        <label
          htmlFor="name"
          className={styles.label}
        >
          팀 이름
        </label>
        <InputField
          id="name"
          type="text"
          value={name}
          placeholder="팀 이름을 입력해주세요."
          onChange={(e) => setName(e.target.value)}
          errorMessage={nameErrorMessage}
          maxlength={MAX_LENGTH.teamName}
        />
        <div className="help-message">
          팀 이름은 최대 {MAX_LENGTH.taskListName}자 입니다.
        </div>

        <Button
          type="submit"
          classname="w-full mt-10"
          disabled={!validName}
        >
          생성하기
        </Button>
        <div className={styles.help}>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </form>
    </div>
  );
}
