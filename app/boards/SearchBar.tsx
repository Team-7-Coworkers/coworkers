'use client';

import { useState } from 'react';

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
    <div>
      <input
        type="text"
        placeholder="검색어를 입력해주세세요"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
