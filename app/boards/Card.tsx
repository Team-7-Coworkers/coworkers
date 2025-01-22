'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '@/app/api/article.api';
import { articleResponseType } from '@/app/types/article';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';
import dayjs from 'dayjs';

export default function Card() {
  const [card, setCard] = useState<articleResponseType['getArticles']>();

  useEffect(() => {
    const loadCard = async () => {
      try {
        const articles = await getArticles({}); // 파라미터 생략
        setCard(articles);
      } catch (error) {
        console.error('카드 로드 실패:', error);
      }
    };
    loadCard();
  }, []);

  return (
    <div>
      {card && card.list.length > 0 ? (
        card.list.map((article) => (
          <div
            key={article.id}
            className="flex h-[176px] w-[589px] cursor-pointer flex-col rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] transition-transform duration-200 hover:translate-y-[-7px]"
          >
            {/* Title and Image */}
            <div className="flex justify-between">
              <p className="text-[18px] text-t-secondary">{article.title}</p>
              <Image
                src={article.image}
                alt={article.title}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-[8px] object-cover"
              />
            </div>

            {/* Additional Information */}
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
        <p>Loading...</p>
      )}
    </div>
  );
}
