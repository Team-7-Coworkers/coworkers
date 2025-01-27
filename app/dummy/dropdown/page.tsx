'use client';

import Dropdown from '@/app/components/Dropdown';
import { useState } from 'react';

export default function Home() {
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');

  const handleOrderChange = (order: 'recent' | 'like') => {
    setOrderBy(order);
  };

  const handleMenuItemClick = (item: string) => {
    alert(`${item} clicked`);
  };

  return (
    <div className="h-screen w-full">
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold">드롭다운 테스트 페이지</h1>

        <div className="flex gap-32">
          <Dropdown>
            <Dropdown.Button
              className={`flex w-full cursor-pointer items-center justify-between rounded-[11px] border-none px-6 py-3 text-md transition-all duration-200`}
            >
              <span>
                {orderBy === 'recent' ? '최신순' : '좋아요순'}
                <span className="ml-4">▼</span>
              </span>
            </Dropdown.Button>
            <Dropdown.Menu
              animationType="scale"
              className="z-30"
            >
              <Dropdown.MenuItem onClick={() => handleOrderChange('recent')}>
                최신순
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleOrderChange('like')}>
                좋아요순
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="p-4">
          <Dropdown className="inline-block">
            <Dropdown.Button className="bg-blue-500 rounded px-4 py-2 text-white">
              Open Menu
            </Dropdown.Button>
            <Dropdown.Menu
              animationType="slide"
              className="mt-2"
            >
              <Dropdown.MenuItem onClick={() => handleMenuItemClick('Item 1')}>
                Item 1
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleMenuItemClick('Item 2')}>
                Item 2
              </Dropdown.MenuItem>
              <Dropdown.MenuItem onClick={() => handleMenuItemClick('Item 3')}>
                Item 3
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
