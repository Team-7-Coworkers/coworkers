import Image from 'next/image';
import GearIcon from '../components/icons/GearIcon';
import { cn } from '../libs/utils';
import CircleGraph from './CircleGraph';
import TaskListItem from './TaskListItem';

import styles from './teampage.module.css';
import KebabIcon from '../components/icons/KebabIcon';

interface Props {
  params: {
    teamid: string;
  };
}

const dummy = {
  name: '경영관리팀',
  id: 1,
  todayTotal: 20,
  todayComplete: 5,
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

export default async function TeamPage({ params }: Props) {
  const { teamid } = await params;
  console.log('teamid', teamid);

  const rate = dummy.todayComplete / dummy.todayTotal;

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

      <section className={styles.section}>
        <h2 className={cn(styles.title, 'mb-4')}>리포트</h2>

        <div className="flex items-center rounded-xl bg-b-secondary p-6">
          <CircleGraph rate={rate} />

          <div className="ml-12">
            <h3 className="mb-1 text-md font-medium">
              오늘의
              <br />
              진행 상황
            </h3>
            <div className="text-gradient text-4xl font-bold">
              {rate * 100}%
            </div>
          </div>

          <div className="ml-auto flex w-[400px] flex-col gap-4">
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
              <div className={styles.reportCount}>{dummy.todayComplete}개</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>멤버</h2>
          <span className="ml-2 text-lg text-t-default">
            ({dummy.members.length}명)
          </span>
          <button className="text-button ml-auto text-md">
            + 새로운 멤버 초대하기
          </button>
        </header>

        <ul className="grid grid-cols-3 gap-6">
          {dummy.members.map((member) => (
            <li
              className="flex items-center rounded-xl bg-b-secondary px-6 py-5"
              key={member.userId}
            >
              <figure className="flex size-8 flex-none items-center rounded-full border-bd-primary bg-b-tertiary">
                <Image
                  src="/images/icons/icon-base-user.svg"
                  width="26"
                  height="26"
                  alt=""
                  className="mx-auto"
                />
              </figure>

              <div className="ml-3 flex-1 overflow-hidden">
                <div className="truncate text-md font-medium">
                  {member.userName}
                </div>
                <div className="mt-[2px] truncate text-sm text-t-secondary">
                  {member.userEmail}
                </div>
              </div>

              <div className="ml-auto">
                <button className={styles.iconButton}>
                  <KebabIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
