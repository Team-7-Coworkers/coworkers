'use client';

import { useParams } from 'next/navigation';

import { cn } from '../libs/utils';

import GearIcon from '../components/icons/GearIcon';
import CircleGraph from './CircleGraph';
import TaskListItem from './TaskListItem';
import MemberListItem from './MemberListItem';

import styles from './teampage.module.css';
import { useState } from 'react';
import Modal, { ModalFooter } from '../components/Modal';
import Button from '../components/Button';
import Image from 'next/image';

// interface Props {
//   params: {
//     teamid: string;
//   };
// }

const dummy = {
  name: '경영관리팀',
  id: 1,
  todayTotal: 20,
  todayComplete: 5,
  role: 'admin',
  members: [
    {
      userImage: '',
      userEmail: 'user1@email.com',
      userName: '우지은',
      userId: 1,
    },
    {
      userImage: '',
      userEmail: 'user2@email.com',
      userName: '강미희',
      userId: 2,
    },
    {
      userImage: '',
      userEmail: 'user3@email.com',
      userName: '이동규',
      userId: 3,
    },
    {
      userImage: '',
      userEmail: 'user4@email.com',
      userName: '김다혜',
      userId: 4,
    },
  ],
  taskLists: [
    {
      displayIndex: 0,
      name: '법인 설립',
      id: 0,
      taskTotal: 4,
      taskComplete: 2,
    },
    {
      displayIndex: 1,
      name: '변경 등기',
      id: 1,
      taskTotal: 5,
      taskComplete: 1,
    },
    {
      displayIndex: 2,
      name: '정기 주총',
      id: 3,
      taskTotal: 5,
      taskComplete: 5,
    },
  ],
};

export default function TeamPage() {
  // const { teamid } = await params;
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [memberIdx, setMemberIdx] = useState<number>(1);
  const { teamid } = useParams();
  console.log('teamid', teamid);

  const rate = dummy.todayComplete / dummy.todayTotal;

  const handleMemberClick = (userId: number) => {
    // console.log('member clicked', userId);
    setMemberModalOpen(true);
    setMemberIdx(dummy.members.findIndex((member) => member.userId === userId));
  };

  const handleEmailCopyClick = () => {
    const email = dummy.members[memberIdx].userEmail;
    navigator.clipboard.writeText(email);
    // TODO: 복사 되었다고 alert 대신 토스트 뛰우기
    alert('이메일이 복사되었습니다.');
    setMemberModalOpen(false);
  };

  return (
    <div className="container flex flex-col py-6">
      <header className={styles.header}>
        <h1 className="text-xl font-bold text-t-inverse">{dummy.name}</h1>

        <button>
          <GearIcon />
        </button>
      </header>

      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>할 일 목록</h2>
          <span className="ml-2 text-lg text-t-default">
            ({dummy.taskLists.length}개)
          </span>
          <button className="text-button ml-auto text-md">
            + 새로운 목록 추가하기
          </button>
        </header>

        <ul>
          {dummy.taskLists.map((taskList) => (
            <TaskListItem
              key={taskList.id}
              {...taskList}
            />
          ))}
        </ul>
      </section>

      {dummy.role === 'admin' && (
        <section className={styles.section}>
          <h2 className={cn(styles.title, 'mb-4')}>리포트</h2>

          <div className="relative flex items-center gap-6 rounded-xl bg-b-secondary p-6">
            <CircleGraph
              rate={rate}
              classnames="flex-1 max-w-[170px]"
            />

            <div className="absolute left-[20%] flex-1 text-center sm:static sm:ml-12 sm:text-left">
              <h3 className="text-xs font-medium sm:hidden">오늘</h3>
              <h3 className="mb-1 hidden text-md font-medium sm:block">
                오늘의
                <br />
                진행 상황
              </h3>
              <div className="text-gradient text-xl font-bold sm:text-4xl">
                {Math.floor(rate * 100)}%
              </div>
            </div>

            <div className="ml-auto flex w-1/2 flex-col gap-4 sm:w-[280px] lg:w-[400px]">
              <div
                className={cn(
                  styles.reportBox,
                  'bg-[url(/images/icons/icon-user.svg)]'
                )}
              >
                <h4 className={styles.reportTitle}>오늘의 할 일</h4>
                <div className={styles.reportCount}>{dummy.todayTotal}개</div>
              </div>

              <div
                className={cn(
                  styles.reportBox,
                  'bg-[url(/images/icons/icon-done.svg)]'
                )}
              >
                <h4 className={styles.reportTitle}>한 일</h4>
                <div className={styles.reportCount}>
                  {dummy.todayComplete}개
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>멤버</h2>
          <span className="ml-2 text-lg text-t-default">
            ({dummy.members.length}명)
          </span>

          {dummy.role === 'admin' && (
            <button className="text-button ml-auto text-md">
              + 새로운 멤버 초대하기
            </button>
          )}
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {dummy.members.map((member) => (
            <MemberListItem
              key={member.userId}
              id={member.userId}
              image={member.userImage}
              name={member.userName}
              email={member.userEmail}
              onClick={handleMemberClick}
            />
          ))}
        </ul>
      </section>

      <Modal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
      >
        <div className="flex flex-col items-center gap-6">
          <figure className={cn(styles.memberFigure, 'size-14')}>
            <Image
              src={
                dummy.members[memberIdx].userImage ||
                '/images/icons/icon-base-user.svg'
              }
              width="40"
              height="40"
              alt=""
              className="mx-auto"
            />
          </figure>
          <div className="text-center">
            <div className="text-md font-medium text-t-primary">
              {dummy.members[memberIdx].userName}
            </div>
            <div className="mt-2 text-xs">
              {dummy.members[memberIdx].userEmail}
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button onClick={handleEmailCopyClick}>이메일 복사하기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
