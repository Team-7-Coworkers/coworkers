'use client';

import { useState } from 'react';

import InputField from '../components/InputField';
import ImageUpload from '../components/ImageUpload';
import Button from '../components/Button';

import styles from '../styles/team.module.css';

export default function AddTeamPage() {
  const [teamName, setTeamName] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ui 확인용
    console.log('handleSubtmi:');
    setImageErrorMessage('프로필 이미지를 넣어주세요.');
    setNameErrorMessage('이미 존재하는 이름입니다.');
  };

  const handleImageUploadSuccess = () => {
    console.log('handleImageUploadSuccess:');
  };

  const handleImageUploadError = () => {
    console.log('handleImageUploadError:');
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
          htmlFor="team-name"
          className={styles.label}
        >
          팀 이름
        </label>
        <InputField
          id="team-name"
          type="text"
          value={teamName}
          placeholder="팀 이름을 입력해주세요."
          onChange={(e) => setTeamName(e.target.value)}
          errorMessage={nameErrorMessage}
        />

        <Button
          type="submit"
          classname="w-full mt-10"
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
