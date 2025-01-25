'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import { getGroups } from '../api/group.api';
import type { groupResponseType } from '../types/group';

import TaskLists from './TaskLists';
import MemberList from './MemberList';
import Report from './Report';

import GearIcon from '../components/icons/GearIcon';
import styles from './teampage.module.css';
// import useUserStore from '../stores/userStore';

interface Props {
  params: {
    teamid: string;
  };
}

export default function TeamPage({ params }: Props) {
  const [data, setData] = useState<groupResponseType | null>(null);
  const [role, setRole] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  // const { user } = useUserStore(); // 아직 못가져옴

  // TODO: user store 에서 가져와야 함
  const D_USER_ID = 1375;

  useEffect(() => {
    // 팀 아이디 값으로 그룹정보 받는 함수
    async function fetchGroups() {
      const { teamid } = await params;
      try {
        const result: groupResponseType = await getGroups({
          id: Number(teamid),
        });
        // console.log('result:', result);
        if (result !== null) {
          setData(result);
          // user id로 role 역할 받기
          const member = result.members.find(
            (member) => member.userId === D_USER_ID
          );
          // console.log('member:', member);
          setRole(member.role);

          let total = 0;
          let complete = 0;
          // 할 일 전체와 완료된 할 일 갯수 받기
          result.taskLists.forEach((taskList) => {
            total += taskList.tasks.length;
            complete += taskList.tasks.filter(
              (task) => task.doneAt !== null
            ).length;
          });
          setTotalTasks(total);
          setCompletedTasks(complete);
        } else {
          // TODO: 방향성 협의 필요
          // 404로 다이렉트
          notFound();
        }
      } catch (err) {
        console.log('--- 그룹 정보 패치: err:', err);
        // 404로 다이렉트
        notFound();
      }
    }

    fetchGroups();
  }, [params]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex flex-col py-6">
      <header className={styles.header}>
        <h1 className="text-xl font-bold text-t-inverse">
          {data.name}({data.id})
        </h1>

        {/* TODO: 드롭다운 적용 */}
        <button>
          <GearIcon />
        </button>
      </header>

      <TaskLists
        groupId={data.id}
        taskLists={data.taskLists}
      />

      {role === 'ADMIN' && (
        <Report
          total={totalTasks}
          complete={completedTasks}
        />
      )}

      <MemberList
        groupId={data.id}
        members={data.members}
        role={role}
      />
    </div>
  );
}
