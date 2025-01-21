'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Checkbox from './Checkbox';

const categories = ['헤더 만들기', '목록 나열', '모달 작업', '기타']; // 목록 목데이터

const items = [
  // 아이템 목 데이터
  {
    id: 1,
    category: '헤더 만들기',
    title: '헤더 계획 세우기',
    comments: 5,
    date: '2025년 1월 21일',
    frequency: '매일 반복',
  },
  {
    id: 2,
    category: '헤더 만들기',
    title: '헤더 구현하기',
    comments: 3,
    date: '2025년 1월 22일',
    frequency: '한 번',
  },
  {
    id: 3,
    category: '목록 나열',
    title: '목록을 직접 나열해보고 테스트하기',
    comments: 4,
    date: '2025년 1월 25일',
    frequency: '월 반복',
  },
  {
    id: 4,
    category: '모달 작업',
    title: '공통 모달을 활용해 모달 만들어보기',
    comments: 7,
    date: '2025년 1월 27일',
    frequency: '주 반복',
  },
  {
    id: 5,
    category: '기타',
    title: '팀 스크럼 때 제안할 내용 정리해보기',
    comments: 5,
    date: '2025년 1월 28일',
    frequency: '매일 반복',
  },
];

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
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="mb-4 flex flex-col items-start rounded-lg bg-b-secondary px-3 py-[14px] text-white shadow-md"
          >
            <div className="relative flex w-full items-center justify-between">
              <div className="flex items-center justify-center">
                <Checkbox
                  id={item.id}
                  checked={!!checkedItems[item.id]}
                  onChange={handleCheckboxChange}
                />
                <h3
                  className={`ml-3 cursor-pointer font-medium ${
                    checkedItems[item.id] ? 'line-through' : ''
                  }`}
                >
                  {item.title}
                </h3>
                <div className="absolute right-6 flex items-center gap-1 text-t-default sm:relative sm:right-0 sm:ml-3">
                  <Image
                    src="/images/icons/icon-comment.svg"
                    alt="댓글"
                    width={16}
                    height={16}
                  />
                  {item.comments}
                </div>
              </div>
              <div className="cursor-pointer">|</div>
              {/* 수정하기 삭제하기 버튼 넣을 자리 */}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/icon-calendar.svg"
                  alt="달력"
                  width={16}
                  height={16}
                />
                <p className="text-sm text-t-default">{item.date}</p>
              </div>
              <div className="text-xs text-t-default">|</div>
              <div className="flex items-center gap-2">
                {item.frequency !== '한 번' && ( //api에 따라 조건부 렌더링을 수정해야 될 수도
                  <Image
                    src="/images/icons/icon-repeat.svg"
                    alt="반복"
                    width={16}
                    height={16}
                  />
                )}
                <p className="text-sm text-t-default">{item.frequency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
