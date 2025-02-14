'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import dayjs from 'dayjs';
import { ArticleResponseType } from '@/app/types/article';
import Pagination from './Pagination';
import Dropdown from '@/app/components/Dropdown';
import PostActionDropdown from './PostActionDropdown';
import useUserStore from '@/app/stores/userStore';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import SkeletonCard from './SkeletonCard';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
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

  const handleOrderChange = (newOrder: 'recent' | 'like') => {
    setOrderByDropdown(newOrder);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('orderBy', newOrder);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {!hideItem && (
        <div className="flex items-center justify-between pb-8 pt-6">
          <p className="text-[20px] font-bold">게시글</p>

          <div>
            <Dropdown>
              <Dropdown.Button className="flex w-auto min-w-[120px] cursor-pointer items-center justify-between whitespace-nowrap rounded-[11px] border-none bg-b-secondary px-5 py-3 text-md transition-all duration-200 hover:bg-primary/90 hover:text-white">
                <span className="flex w-full justify-between">
                  {orderByDropdown === 'recent' ? '최신순' : '좋아요순'}
                  <Image
                    src="/images/icons/ic_toggle.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </span>
              </Dropdown.Button>

              <Dropdown.Menu
                animationType="scale"
                className="z-30 w-auto min-w-[120px]"
              >
                <Dropdown.MenuItem
                  className="w-full"
                  onClick={() => handleOrderChange('recent')}
                >
                  최신순
                </Dropdown.MenuItem>
                <Dropdown.MenuItem
                  className="w-full"
                  onClick={() => handleOrderChange('like')}
                >
                  좋아요순
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}

      {/* 카드 리스트 */}
      <div className="grid gap-[24px] sm:grid-cols-1 lg:grid-cols-2">
        {articles ? (
          articles.list.length > 0 ? (
            articles.list.map((article) => {
              const isOwner = user?.nickname === article.writer.nickname;

              return (
                <Link
                  key={article.id}
                  href={`/boards/${article.id}?page=${currentPage}`}
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
                      <p className="mr-[8px] line-clamp-2 max-h-[48px] flex-grow overflow-hidden break-all text-[18px] leading-[1.5] text-t-secondary">
                        {article.title}
                      </p>

                      {article.image && (
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
                            onEdit={() => {}}
                            onDeleteSuccess={() => {}}
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
            <div className="col-span-2 flex w-full items-center justify-center">
              <p className="text-center text-t-default">
                검색 결과가 없습니다.
              </p>
            </div>
          )
        ) : (
          [...Array(pageSize)].map((_, index) => (
            <SkeletonCard
              key={index}
              variant="list"
              className="h-[175px] w-full flex-row"
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {!hideItem && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
