'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';

import Button from '@/app/components/Button';
import useUserStore from '@stores/userStore';

import BestCard from './BestCardList';
import CardList from './CardList';
import SearchBar from './SearchBar';

export default function Boards() {
  const { user } = useUserStore();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="relative mx-auto flex w-[90%] flex-col items-center sm:w-[90%] lg:w-[65%]">
      <div className="w-full">
        <div className="flex items-center justify-between pb-8 pt-10">
          <p className="text-[20px] font-bold">베스트 게시글</p>
          <Link
            href="/boards/best"
            className="text-[14px] text-t-default"
          >
            더보기 <span className="ml-1">{'>'}</span>
          </Link>
        </div>
        <BestCard />
        <SearchBar onSearch={handleSearch} />
        <Suspense fallback={<></>}>
          <CardList keyword={searchKeyword} />
        </Suspense>
      </div>

      {user && (
        <div className="right fixed bottom-20 right-[calc(50%-45%)] z-50 sm:right-[calc(50%-45%)] lg:right-[calc(50%-32.5%)]">
          <Button
            styleType="solid"
            size="w-[100px] h-[45px]"
            classname="transition-all duration-300 ease-in-out hover:translate-y-[-10px] rounded-[50px]"
            href="/boards/write"
          >
            + 글쓰기
          </Button>
        </div>
      )}
    </div>
  );
}
