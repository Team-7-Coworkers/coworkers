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
            className="flex flex-grow flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-300 hover:scale-105"
            style={{
              flexBasis: '0', // 모든 카드의 기본 크기를 균등하게 설정
            }}
          >
            <div className="mb-[10px] flex">
              <Image
                src={MedalIcon}
                alt=""
              />
              <p className="ml-[4px] font-semibold">Best</p>
            </div>
            <div className="flex justify-between">
              <p
                className="max-h-[48px] overflow-hidden text-[18px] leading-[1.5] text-t-secondary"
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {article.title}
              </p>
              {article.image !== 'https://no-image/no-image.png' && (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-[8px] object-cover pl-[10px]"
                />
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
