'use client';

import BestCard from './BestCardList';
import CardList from './CardList';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function Boards() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center sm:w-[90%] lg:w-[65%]">
      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
        <h1>베스트 게시글</h1>
        <BestCard />
        <CardList keyword={searchKeyword} />
      </div>
    </div>
  );
}
