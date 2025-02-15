'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import isEqual from 'lodash.isequal';

import { getUserGroups } from '@api/user.api';
import { extractTeamIdFromPath } from '@utils/navigation';
import useTeamStore from '@stores/teamStore';
import useUserStore from '@stores/userStore';
import TeamListDropDown from '@components/Gnb/TeamListDropDown';
import TeamListSideBar from '@components/Gnb/TeamListSideBar';
import ProfileDropDown from '@components/Gnb/ProfileDropDown';
import LoginMenu from '@components/Gnb/LoginMenu';

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

  const handleOpenSideBar = useCallback(() => {
    setIsSideBarOpen(true);
  }, []);

  const handleCloseSideBar = useCallback(() => {
    setIsSideBarOpen(false);
  }, []);

  useEffect(() => {
    updateTeamInfo();
  }, [updateTeamInfo]);

  return (
    <nav className="fixed left-0 top-0 z-20 w-full bg-b-secondary">
      <div className="flex h-[60px] w-full items-center justify-between px-4 py-3.5 text-lg font-medium text-t-primary lg:container">
        <div className="flex space-x-6 lg:space-x-10">
          <div className="flex items-center gap-4">
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

            <div className="flex">
              <Link
                href="/"
                className="flex"
              >
                <Image
                  src="/images/logos/logo.svg"
                  alt="coworkers"
                  width={102}
                  height={20}
                  className="lg:h-15 lg:w-40"
                />
              </Link>
            </div>
          </div>
          <div className="hidden items-center space-x-4 sm:flex lg:space-x-10">
            {user && (
              <TeamListDropDown
                teamList={teamList}
                currentTeam={currentTeam || teamList[0]}
              />
            )}
            <Link
              href="/boards"
              className={`${currentPath.includes('/boards') ? 'text-green-600' : 'hover:text-green-600'} hidden text-md sm:block lg:text-lg`}
            >
              자유게시판
            </Link>
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
