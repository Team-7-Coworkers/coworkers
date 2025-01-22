'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '@/app/api/article.api';
import { articleResponseType } from '@/app/types/article';
import Image from 'next/image';
import HeartIcon from '@/public/images/icons/ic-heart.svg';

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
          <div key={article.id}>
            <p>{article.title}</p>
            <p>{article.writer.nickname}</p>
            <p>
              <Image
                src={HeartIcon}
                alt="heartIcon"
              />
              {article.likeCount}
            </p>
            <Image
              src={article.image}
              alt={article.title}
              width={100}
              height={100}
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
