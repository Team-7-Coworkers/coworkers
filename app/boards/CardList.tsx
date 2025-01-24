'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import dayjs from 'dayjs';
import { articleResponseType } from '@/app/types/article';
import { useState } from 'react';
import Pagination from './Pagination';
import Dropdown from '@/app/components/Dropdown';

export default function CardList({ keyword }: { keyword: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pageSize = 6;

  const articles = Card({ currentPage, orderBy, keyword }) as
    | articleResponseType['getArticles']
    | null;

  if (articles && articles.totalCount) {
    const calculatedTotalPages = Math.ceil(articles.totalCount / pageSize);
    if (totalPages !== calculatedTotalPages) {
      setTotalPages(calculatedTotalPages);
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOrderChange = (newOrder: 'recent' | 'like') => {
    setOrderBy(newOrder);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-8 pt-20">
        <p className="text-[20px] font-bold">게시글</p>

        {/* 드롭다운 */}
        <div>
          <Dropdown onClose={() => setIsDropdownOpen(false)}>
            <Dropdown.Button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-[11px] border-none px-6 py-3 text-md transition-all duration-200 ${
                isDropdownOpen
                  ? 'bg-primary/90 text-white'
                  : 'bg-b-secondary hover:bg-primary/90'
              }`}
            >
              <span>
                {orderBy === 'recent' ? '최신순' : '좋아요순'}
                <span className="ml-4">▼</span>
              </span>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isDropdownOpen}
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
      </div>

      {/* 카드 리스트 */}
      <div className="grid gap-[24px] sm:grid-cols-1 lg:grid-cols-2">
        {articles && articles.list.length > 0 ? (
          articles.list.map((article) => (
            <div
              key={article.id}
              className="flex h-[175px] cursor-pointer flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-300 hover:scale-105 hover:bg-b-tertiary"
            >
              <div className="flex items-start justify-between">
                <p className="mr-[8px] line-clamp-2 max-h-[48px] flex-grow overflow-hidden text-[18px] leading-[1.5] text-t-secondary">
                  {article.title}
                </p>
                {article.image !== 'https://no-image/no-image.png' && (
                  <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[8px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex">
                  <p className="mr-[32px] text-[14px] text-t-primary">
                    {article.writer.nickname}
                  </p>
                  <p className="text-[14px] text-t-disabled">
                    {dayjs(article.createdAt).format('YYYY.MM.DD')}
                  </p>
                </div>
                <div className="flex items-center text-t-disabled">
                  <Image
                    src={HeartIcon}
                    alt="heartIcon"
                    className="mr-1 h-4 w-4"
                  />
                  <p className="text-[14px]">{article.likeCount}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>로딩중...</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
