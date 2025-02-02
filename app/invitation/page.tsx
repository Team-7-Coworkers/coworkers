'use client';

import { useState } from 'react';

import InputField from '../components/InputField';
import Button from '../components/Button';

import styles from '../styles/team.module.css';

export default function InvitationPage() {
  const [linkErrorMessage, setLinkErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ui 확인용
    console.log('handleSubtmi:');
    setLinkErrorMessage('유효하지 않은 링크 입니다.');
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
          placeholder="팀 링크를 입력해주세요."
          errorMessage={linkErrorMessage}
        />

        <Button
          type="submit"
          classname="w-full mt-10"
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
