'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import dayjs from 'dayjs';
import { ArticleResponseType } from '@/app/types/article';
import { useState } from 'react';
import Pagination from './Pagination';
import Dropdown from '@/app/components/Dropdown';
import PostActionDropdown from './PostActionDropdown';
import useUserStore from '@/app/stores/userStore';
import Link from 'next/link';

export default function CardList({
  keyword,
  orderBy = 'recent',
  hideItem = false, // 베스트 더보기 페이지 때문에 추가했습니다
}: {
  keyword: string;
  orderBy?: 'recent' | 'like';
  hideItem?: boolean;
}) {
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderByDropdown, setOrderByDropdown] = useState<'recent' | 'like'>(
    orderBy
  );

  const pageSize = 6;

  const articles = Card({ currentPage, orderBy: orderByDropdown, keyword }) as
    | ArticleResponseType['getArticles']
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
    setOrderByDropdown(newOrder);
    setCurrentPage(1);
  };

  return (
    <div>
      {!hideItem && (
        <div className="flex items-center justify-between pb-8 pt-6">
          <p className="text-[20px] font-bold">게시글</p>

          <div>
            <Dropdown>
              <Dropdown.Button
                className={`flex w-full cursor-pointer items-center justify-between rounded-[11px] border-none bg-b-secondary px-6 py-3 text-md transition-all duration-200 hover:bg-primary/90 hover:text-white`}
              >
                <span>
                  {orderByDropdown === 'recent' ? '최신순' : '좋아요순'}
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
        </div>
      )}

      {/* 카드 리스트 */}
      <div className="grid gap-[24px] sm:grid-cols-1 lg:grid-cols-2">
        {articles && articles.list.length > 0 ? (
          articles.list.map((article) => {
            const isOwner = user?.nickname === article.writer.nickname;

            return (
              <Link
                key={article.id}
                href={`/boards/${article.id}`}
                className="pointer-events-auto block"
              >
                <div
                  className="flex h-[175px] cursor-pointer flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-200 hover:scale-105 hover:bg-b-tertiary"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('.dropdown')) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <p className="mr-[8px] line-clamp-2 max-h-[48px] flex-grow overflow-hidden text-[18px] leading-[1.5] text-t-secondary">
                      {article.title}
                    </p>

                    {article.image &&
                      article.image !== 'https://no-image/no-image.png' && (
                        <div className="relative ml-[16px] h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[8px]">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                    {/* Dropdown */}
                    {isOwner && (
                      <div className="dropdown pointer-events-auto ml-[16px] flex-shrink-0">
                        <PostActionDropdown
                          onEdit={() => console.log(`수정: ${article.id}`)}
                          onDeleteSuccess={() =>
                            console.log('삭제 완료 후 상태 업데이트')
                          }
                          articleId={article.id}
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
              </Link>
            );
          })
        ) : (
          <p>로딩중...</p>
        )}
      </div>

      {/* 페이지네이션 */}
      {!hideItem && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
