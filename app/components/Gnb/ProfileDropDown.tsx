'use client';

import Link from 'next/link';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useUserStore from '@stores/userStore';
import useTeamStore from '@stores/teamStore';
import Dropdown from '@components/Dropdown';
import Img from '@components/Img';
import { UserType } from '@app/types/shared';

interface ProfileDropDownProps {
  user: UserType;
}

const dropDownItemStyle = 'px-0 py-0 text-md sm:text-lg';
const itemStyle = 'block px-3 py-2 sm:py-3';

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
  const { isGoogleLogin, clearUser } = useUserStore();
  const { clearTeam } = useTeamStore();

  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    clearTeam();
    document.cookie = 'accessToken=; path=/; max-age=0';
    localStorage.removeItem('kakao_state');

    if (isGoogleLogin) {
      signOut();
    }

    router.push('/');
  };

  return (
    <Dropdown>
      <Dropdown.Button className="flex items-center rounded-lg p-1 hover:bg-b-tertiary lg:px-2 lg:py-1.5">
        <div className="flex items-center gap-2 p-0.5 lg:p-0">
          <div className="hidden text-md lg:block">{user.nickname}</div>
          <div className="h-[36px] w-[36px] overflow-hidden rounded-lg">
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
        className="right-0 mt-3 w-[140px] px-[8px] py-[12px] sm:w-[152px]"
        animationType="scale"
      >
        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/myhistory"
            className={itemStyle}
          >
            마이 히스토리
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/mypage"
            className={itemStyle}
          >
            계정 설정
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem className={dropDownItemStyle}>
          <Link
            href="/invitation"
            className={itemStyle}
          >
            팀 참여
          </Link>
        </Dropdown.MenuItem>

        <Dropdown.MenuItem className={dropDownItemStyle}>
          <div
            className={itemStyle}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
