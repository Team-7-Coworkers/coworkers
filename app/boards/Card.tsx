'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '@/app/api/article.api';
import { articleResponseType } from '@/app/types/article';

export default function Card({ isBest }: { isBest?: boolean }) {
  const [articles, setArticles] =
    useState<articleResponseType['getArticles']>();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articles = await getArticles({
          orderBy: isBest ? 'like' : 'recent',
          pageSize: isBest ? 3 : 10,
        });
        setArticles(articles);
      } catch (error) {
        console.error('게시글 로드 실패:', error);
      }
    };
    loadArticles();
  }, [isBest]);

  return articles;
}
