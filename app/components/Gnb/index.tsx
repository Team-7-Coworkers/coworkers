'use client';

import Image from 'next/image';

import TeamListDropDown from './TeamListDropDown';
import TeamListSideBar from './TeamListSideBar';

import { useEffect, useState } from 'react';
import useTeamStore from '@/app/stores/teamStore';
import useUserStore from '@/app/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '@/app/api/user.api';
import { usePathname } from 'next/navigation';

export default function GNB() {
  const pathname = usePathname();
  const match = pathname.match(/^\/(\d+)$/);
  const teamId = match ? Number(match[1]) : null;

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
      <div className="flex h-[60px] w-full items-center justify-between px-4 py-3.5 text-lg font-medium text-t-primary lg:container sm:px-6">
        <div className="flex space-x-10">
          <div className="flex items-center gap-4">
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

            <div className="relative flex h-[20px] w-[102px] lg:h-[60px] lg:w-[158px]">
              <Image
                src="/images/logos/logo.svg"
                alt="Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="hidden items-center space-x-10 sm:flex">
            {teamId && (
              <>
                <TeamListDropDown
                  teamList={teamList}
                  currentTeam={teamList.find((team) => team.id === teamId)}
                />
                <div>자유게시판</div> {/*자유게시판 이동*/}
              </>
            )}
            {/* 기본값 어떻게 처리할 지 고민중 */}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={'/images/icons/ic_user.svg'}
            width={24}
            height={24}
            alt="메뉴 버튼"
          />
          <div className="hidden text-md lg:block">
            {user?.nickname || 'unknown'}
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <TeamListSideBar
          teamList={teamList}
          isOpen={isSideBarOpen}
          onClose={handleCloseSideBar}
        />
      </div>
    </nav>
  );
}
