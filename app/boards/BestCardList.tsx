'use client';

import Card from './Card';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import MedalIcon from '@/public/images/icons/ic_medal.svg';
import dayjs from 'dayjs';

export default function BestCardList() {
  const articles = Card({ isBest: true });
  return (
    <div className="flex justify-between gap-[20px]">
      {articles && articles.list.length > 0 ? (
        articles.list.map((article) => (
          <div
            key={article.id}
            className="flex h-[220px] flex-grow basis-0 cursor-pointer flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-300 hover:scale-105 hover:bg-b-tertiary"
          >
            <div className="mb-[10px] flex">
              <Image
                src={MedalIcon}
                alt=""
              />
              <p className="ml-[4px] font-semibold">Best</p>
            </div>
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
        ))
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
}
