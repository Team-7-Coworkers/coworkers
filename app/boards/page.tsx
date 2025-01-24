'use client';

import BestCard from './BestCardList';
import CardList from './CardList';
import SearchBar from './SearchBar';
import { useState } from 'react';
import Link from 'next/link';

export default function Boards() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center sm:w-[90%] lg:w-[65%]">
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
        <CardList keyword={searchKeyword} />
      </div>
    </div>
  );
}
