'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchIcon from '@/public/images/icons/ic_search.svg';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    onSearch(e.target.value);
  };

  return (
    <div className="pt-14">
      <div className="flex w-[100%] items-center gap-3 rounded-[12px] border border-gray-700 bg-b-secondary px-4 py-2">
        <Image
          src={SearchIcon}
          alt=""
        />
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
          className="w-[100%] bg-b-secondary py-2 placeholder-t-default focus:outline-none"
        />
      </div>
    </div>
  );
}
