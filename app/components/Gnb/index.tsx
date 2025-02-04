'use client';

import Image from 'next/image';

import TeamListDropDown from './TeamListDropDown';
import TeamListSideBar from './TeamListSideBar';

import { useEffect, useState } from 'react';
import useTeamStore from '@/app/stores/teamStore';
import useUserStore from '@/app/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '@/app/api/user.api';
import { useRouter, usePathname } from 'next/navigation';
import { extractTeamIdFromPath } from '@/app/utils/navigation';
import ProfileDropDown from './ProfileDropDown';
import Link from 'next/link';

export default function GNB() {
  const currentPath = usePathname() || '';
  const teamId = extractTeamIdFromPath(currentPath);

  const router = useRouter();

  const { user } = useUserStore();
  const { setTeamList, setCurrentTeam } = useTeamStore();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const { data: teamList = [] } = useQuery({
    queryKey: ['coworkers-teamList', user?.id],
    queryFn: getUserGroups,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (teamList.length > 0) {
      const currentTeamList = useTeamStore.getState();

      if (JSON.stringify(currentTeamList) !== JSON.stringify(teamList)) {
        setTeamList(teamList);
      }

      if (!teamId) {
        setCurrentTeam(teamList[0]?.id);
      }
    }
  }, [teamList, setTeamList, teamId, setCurrentTeam]);

  const handleOpenSideBar = () => {
    setIsSideBarOpen(true);
    console.log(isSideBarOpen);
  };

  const handleCloseSideBar = () => {
    setIsSideBarOpen(false);
    console.log(isSideBarOpen);
  };

  return (
    <nav className="fixed left-0 top-0 z-10 w-full bg-b-secondary">
      <div className="flex h-[60px] w-full items-center justify-between px-4 py-3.5 text-lg font-medium text-t-primary lg:container">
        <div className="flex space-x-10">
          <div className="flex items-center gap-4">
            {user && (
              <div
                className="cursor-pointer sm:hidden"
                onClick={handleOpenSideBar}
              >
                <Image
                  src={'/images/icons/ic_gnb-menu.svg'}
                  width={24}
                  height={24}
                  alt="메뉴 버튼"
                />
              </div>
            )}

            <div className="relative flex h-[20px] w-[102px] lg:h-[60px] lg:w-[158px]">
              <Link href="/">
                <Image
                  src="/images/logos/logo.svg"
                  alt="Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>
          </div>
          <div className="hidden items-center space-x-10 sm:flex">
            {user && (
              <>
                <TeamListDropDown
                  teamList={teamList}
                  currentTeam={
                    teamList.find((team) => team.id === teamId) || teamList[0]
                  }
                />
                <button onClick={() => router.push('/boards')}>
                  자유게시판
                </button>{' '}
                {/*자유게시판 이동*/}
              </>
            )}
            {/* 기본값 어떻게 처리할 지 고민중 */}
          </div>
        </div>

        {user && <ProfileDropDown user={user} />}
      </div>

      <div className="sm:hidden">
        <TeamListSideBar
          teamList={teamList}
          isOpen={isSideBarOpen}
          onClose={handleCloseSideBar}
          currentTeamId={teamId || undefined}
        />
      </div>
    </nav>
  );
}
