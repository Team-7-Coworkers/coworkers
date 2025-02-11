'use client';

import { UserType } from '@/app/types/shared';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '../Dropdown';
import useUserStore from '@/app/stores/userStore';

import { signOut } from 'next-auth/react';
import useTeamStore from '@/app/stores/teamStore';

interface ProfileDropDownProps {
  user: UserType;
}

const dropDownItemStyle = 'px-0 py-0 text-md sm:text-lg';
const linkStyle = 'block px-3 py-2 sm:py-3';

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
  const { isGoogleLogin, clearUser } = useUserStore();
  const { clearTeam } = useTeamStore();

  const handleLogout = () => {
    clearUser();
    clearTeam();

    if (isGoogleLogin) {
      signOut();

      return;
    }
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <div className="flex items-center gap-2">
          <Image
            src={'/images/icons/ic_user.svg'}
            width={24}
            height={24}
            alt="메뉴 버튼"
          />
          <div className="hidden text-md lg:block">{user.nickname}</div>
        </div>
      </Dropdown.Button>

      <Dropdown.Menu
        className="right-0 w-[140px] p-[8px] py-[12px] sm:w-[152px]"
        animationType="scale"
      >
        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/myhistory"
            className={linkStyle}
          >
            마이 히스토리
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/mypage"
            className={linkStyle}
          >
            계정 설정
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/invitation"
            className={linkStyle}
          >
            팀 참여
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem
          className={dropDownItemStyle}
          onClick={handleLogout}
        >
          <Link
            href="/"
            className={linkStyle}
          >
            로그아웃
          </Link>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
