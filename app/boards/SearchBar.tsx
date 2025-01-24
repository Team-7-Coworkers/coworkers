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
      {inputValue && (
        <p className="relative mt-4 text-[35px] font-medium">
          <span
            className="animate-gradientMove bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            {inputValue}
          </span>

          <span
            className="animate-gradientMove bg-gradient-to-r from-gray-200 via-gray-600 to-gray-200 bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            으로 검색한 결과입니다.
          </span>
        </p>
      )}
    </div>
  );
}
