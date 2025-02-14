'use client';

import Link from 'next/link';

import { signOut } from 'next-auth/react';

import useUserStore from '@stores/userStore';
import useTeamStore from '@stores/teamStore';
import Dropdown from '@components/Dropdown';
import Img from '@components/Img';
import { UserType } from '@app/types/shared';

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
      <Dropdown.Button className="flex items-center rounded-lg px-2 py-1.5 lg:hover:bg-b-tertiary">
        <div className="flex items-center gap-2">
          <div className="hidden text-md lg:block">{user.nickname}</div>
          <div className="h-8 w-8 overflow-hidden rounded-lg hover:bg-b-tertiary lg:hover:bg-transparent">
            <Img
              src={user.image || ''}
              baseImage="/images/icons/ic_user.svg"
              alt="팀 이미지"
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          </div>
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
