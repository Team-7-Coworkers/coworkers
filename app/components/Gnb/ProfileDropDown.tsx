'use client';

import { UserType } from '@/app/types/shared';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '../Dropdown';
import useUserStore from '@/app/stores/userStore';
import useTeamStore from '@/app/stores/teamStore';

interface ProfileDropDownProps {
  user: UserType;
}

const dropDownItemStyle = 'text-md sm:text-lg pt-2 px-4 pb-2';

export default function ProfileDropDown({ user }: ProfileDropDownProps) {
  const { clearUser } = useUserStore();
  const { clearTeam } = useTeamStore();

  const handleLogout = () => {
    clearUser();
    clearTeam();
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
        <Link href="/myhistory">
          <Dropdown.MenuItem className={dropDownItemStyle}>
            마이 히스토리
          </Dropdown.MenuItem>
        </Link>
        <Link href="/mypage">
          <Dropdown.MenuItem className={dropDownItemStyle}>
            계정 설정
          </Dropdown.MenuItem>
        </Link>
        <Link href="/invitation">
          <Dropdown.MenuItem className={dropDownItemStyle}>
            팀 참여
          </Dropdown.MenuItem>
        </Link>
        <Link href="/">
          <Dropdown.MenuItem
            className={dropDownItemStyle}
            onClick={handleLogout}
          >
            로그아웃
          </Dropdown.MenuItem>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}
