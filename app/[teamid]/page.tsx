'use client';

import { useParams } from 'next/navigation';

import TaskLists from './TaskLists';
import MemberList from './MemberList';
import Report from './Report';
// import Modal, { ModalFooter } from '../components/Modal';

import GearIcon from '../components/icons/GearIcon';
import styles from './teampage.module.css';

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
  const { teamid } = useParams();
  console.log('teamid', teamid);

  return (
    <div className="container flex flex-col py-6">
      <header className={styles.header}>
        <h1 className="text-xl font-bold text-t-inverse">{dummy.name}</h1>

        {/* TODO: 드롭다운 적용 */}
        <button>
          <GearIcon />
        </button>
      </header>

      <TaskLists taskLists={dummy.taskLists} />

      {dummy.role === 'admin' && (
        <Report
          total={dummy.todayTotal}
          complete={dummy.todayComplete}
        />
      )}

      <MemberList
        members={dummy.members}
        role={dummy.role}
      />
    </div>
  );
}
