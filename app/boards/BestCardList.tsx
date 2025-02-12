'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import MedalIcon from '@/public/images/icons/ic_medal.svg';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function BestCardList() {
  const articles = Card({
    isBest: true,
    currentPage: 1,
    orderBy: 'like',
    keyword: '',
  });
  return (
    <div className="flex w-full justify-between gap-[20px]">
      {articles && articles.list.length > 0 ? (
        articles.list.map((article) => (
          <Link
            key={article.id}
            href={`/boards/${article.id}`}
            className="block flex-grow basis-0"
          >
            <div className="flex h-[220px] flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-300 hover:scale-105 hover:bg-b-tertiary">
              <div className="mb-[10px] flex items-center">
                <Image
                  src={MedalIcon}
                  alt=""
                />
                <p className="ml-[4px] font-semibold">Best</p>
              </div>
              <div className="flex items-start justify-between">
                {/* Title */}
                <p className="mr-[8px] line-clamp-2 max-h-[48px] break-all text-[18px] leading-[1.5] text-t-secondary">
                  {article.title}
                </p>
                {/* Image */}
                {article.image && (
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
              <p className="text-[14px] text-t-disabled">
                {dayjs(article.createdAt).format('YYYY.MM.DD')}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex">
                  <p className="mr-[32px] text-[14px] text-t-primary">
                    {article.writer.nickname}
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
        ))
      ) : (
        <div className="flex w-full gap-5 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`flex h-[220px] w-full animate-pulse rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[29px] ${
                index >= 2
                  ? 'md:inline-flex hidden lg:inline-flex'
                  : index === 1
                    ? 'md:w-1/2 hidden sm:inline-flex'
                    : 'w-full'
              }`}
            >
              <div className="mb-2 flex flex-1 flex-col justify-between">
                <div className="mb-2 h-[13px] w-1/4 rounded-md bg-gray-500"></div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-1 flex-col">
                    <div className="mb-2 h-[17px] w-3/4 rounded-md bg-gray-500"></div>
                    <div className="mb-4 h-[17px] w-1/2 rounded-md bg-gray-500"></div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="h-[72px] w-[72px] rounded-md bg-gray-500"></div>
                  </div>
                </div>

                <div className="mt-auto flex w-full justify-between">
                  <div className="h-[14px] w-[80px] rounded-md bg-gray-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
