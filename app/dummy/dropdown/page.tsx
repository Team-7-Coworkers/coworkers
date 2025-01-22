'use client';

import Dropdown from '@/app/components/Dropdown';
import useToggle from '@/app/hooks/useToggle';
import Image from 'next/image';

export default function Home() {
  const dropdown1 = useToggle();
  const dropdown2 = useToggle();

  return (
    <div className="h-screen w-full">
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold">드롭다운 테스트 페이지</h1>

        <div className="flex gap-32">
          <Dropdown onClose={dropdown1.setFalse}>
            <Dropdown.Button onClick={dropdown1.toggle}>
              <div className="w-[120px] cursor-pointer rounded-[11px] border-[1px] border-white bg-b-primary px-[16px] pb-[11px] pt-[12px] text-md">
                드롭다운 버튼
              </div>
            </Dropdown.Button>
            {dropdown1.state && (
              <Dropdown.Menu
                className="right-0 top-[50px]"
                isOpen={dropdown1.state}
                animationType="slide"
              >
                <Dropdown.MenuItem onClick={() => alert('한 번 clicked')}>
                  한 번
                </Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => alert('매일 clicked')}>
                  매일
                </Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => alert('주 반복 clicked')}>
                  주 반복
                </Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => alert('월 반복 clicked')}>
                  월 반복
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            )}
          </Dropdown>
          <Dropdown onClose={dropdown2.setFalse}>
            <Dropdown.Button onClick={dropdown2.toggle}>
              <Image
                src="/images/icons/ic_user.svg"
                alt="드롭다운 이미지 버튼 예시"
                width={24}
                height={24}
              />
            </Dropdown.Button>
            {dropdown2.state && (
              <Dropdown.Menu
                className="right-0 top-[30px] text-center"
                isOpen={dropdown2.state}
                animationType="scale"
              >
                <Dropdown.MenuItem
                  onClick={() => console.log('마이 히스토리 clicked')}
                >
                  마이 히스토리
                </Dropdown.MenuItem>
                <Dropdown.MenuItem
                  onClick={() => console.log('계정 설정 clicked')}
                >
                  계정 설정
                </Dropdown.MenuItem>
                <Dropdown.MenuItem
                  onClick={() => console.log('팀 참여 clicked')}
                >
                  팀 참여
                </Dropdown.MenuItem>
                <Dropdown.MenuItem
                  onClick={() => console.log('로그아웃 clicked')}
                >
                  로그아웃
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
