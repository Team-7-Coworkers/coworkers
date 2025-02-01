'use client';

import { useState } from 'react';

import { postGroups } from '../api/group.api';
import type { GroupResponseType } from '../types/group';

import InputField from '../components/InputField';
import ImageUpload from '../components/ImageUpload';
import Button from '../components/Button';

import styles from '../styles/team.module.css';
import { useRouter } from 'next/navigation';

const MIN_NAME_LENGTH = 2;

export default function AddTeamPage() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const router = useRouter();

  const validName = name.trim() !== '' && name.trim().length >= MIN_NAME_LENGTH;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('--- handleSubmit:');

    if (!validName) {
      setNameErrorMessage('팀 이름을 최소 2글자 이상 작성하셔야 합니다.');
      return;
    }

    const result: GroupResponseType['postGroups'] = await postGroups({
      image,
      name,
    });
    // console.log('--- result', result);
    router.push(`/${result.id}`);
  };

  const handleImageUploadSuccess = (url: string) => {
    // console.log('--- handleImageUploadSuccess:', url);
    setImage(url);
  };

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
        />

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
