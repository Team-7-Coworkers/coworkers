'use client';

import React, { useState } from 'react';
import { categories, items } from './mockdata';
import ItemList from './ItemList';

export default function ListCategory() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('헤더 만들기'); // 후에 사용자가 팀페이지에서 골라서 들어오는 것으로 초기값 변경
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <div className="flex space-x-5 text-lg font-medium">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`pb-2 ${
              selectedCategory === category
                ? 'border-b-2 border-white text-white'
                : 'text-t-default'
            }`}
            aria-label={`Select category ${category}`}
          >
            {category}
          </button>
        ))}
      </div>
      <ItemList
        items={filteredItems}
        checkedItems={checkedItems}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
