'use client';

import Image from 'next/image';

import TeamListDropDown from './TeamListDropDown';
import TeamListSideBar from './TeamListSideBar';

import { useState } from 'react';

export default function GNB() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleOpenSideBar = () => {
    setIsSideBarOpen(true);
    console.log(isSideBarOpen);
  };

  const handleCloseSideBar = () => {
    setIsSideBarOpen(false);
    console.log(isSideBarOpen);
  };

  return (
    <>
      <nav className="sm:py fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-between bg-b-secondary px-4 py-3.5 text-lg font-medium text-t-primary sm:px-6 lg:px-[18vw]">
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
            <TeamListDropDown />
            <div>자유게시판</div> {/*자유게시판 이동*/}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={'/images/icons/ic_user.svg'}
            width={24}
            height={24}
            alt="메뉴 버튼"
          />
          <div className="hidden text-md lg:block">사용자</div>
        </div>
      </nav>

      <div className="sm:hidden">
        <TeamListSideBar
          isOpen={isSideBarOpen}
          onClose={handleCloseSideBar}
        />
      </div>
    </>
  );
}
