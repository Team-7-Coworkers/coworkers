'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import dayjs from 'dayjs';
import { articleResponseType } from '@/app/types/article';
import { useState } from 'react';
import Pagination from './PageNation';

export default function CardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const articles = Card({ currentPage }) as
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

  return (
    <div>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
