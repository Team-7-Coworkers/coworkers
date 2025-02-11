'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import isEqual from 'lodash.isequal';

import TeamListDropDown from './TeamListDropDown';
import TeamListSideBar from './TeamListSideBar';
import ProfileDropDown from './ProfileDropDown';
import LoginMenu from './LoginMenu';

import useTeamStore from '@/app/stores/teamStore';
import useUserStore from '@/app/stores/userStore';
import { getUserGroups } from '@/app/api/user.api';
import { usePathname } from 'next/navigation';
import { extractTeamIdFromPath } from '@/app/utils/navigation';

export default function GNB() {
  const currentPath = usePathname() || '';
  const teamId = extractTeamIdFromPath(currentPath);
  const isLoginMenuHidden =
    currentPath === '/login' || currentPath === '/signup';

  const { user } = useUserStore();
  const { teamList, setTeamList, currentTeam, setCurrentTeam } = useTeamStore();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const { data: fetchedTeamList = [] } = useQuery({
    queryKey: ['coworkers-teamList', user?.id],
    queryFn: getUserGroups,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
  });

  const updateTeamInfo = useCallback(() => {
    if (fetchedTeamList.length === 0) return;

    const currentStoreTeamList = useTeamStore.getState().teamList;
    if (!isEqual(fetchedTeamList, currentStoreTeamList)) {
      setTeamList(fetchedTeamList);
    }

    if (!teamId || teamId === currentTeam?.id) {
      setCurrentTeam(currentTeam?.id || fetchedTeamList[0]?.id);
    } else {
      setCurrentTeam(teamId);
    }
  }, [fetchedTeamList, teamId, currentTeam?.id, setTeamList, setCurrentTeam]);

  useEffect(() => {
    updateTeamInfo();
  }, [updateTeamInfo]);

  const handleOpenSideBar = useCallback(() => {
    setIsSideBarOpen(true);
  }, []);

  const handleCloseSideBar = useCallback(() => {
    setIsSideBarOpen(false);
  }, []);

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
                  src="/images/icons/ic_gnb-menu.svg"
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
                  alt="coworkers"
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
                  currentTeam={currentTeam || teamList[0]}
                />
                <Link href="/boards">자유게시판</Link>
              </>
            )}
          </div>
        </div>

        {user ? (
          <ProfileDropDown user={user} />
        ) : (
          !isLoginMenuHidden && <LoginMenu />
        )}
      </div>

      <div className="sm:hidden">
        <TeamListSideBar
          teamList={teamList}
          isOpen={isSideBarOpen}
          onClose={handleCloseSideBar}
          currentTeamId={teamId || undefined}
          currentPath={currentPath}
        />
      </div>
    </nav>
  );
}
