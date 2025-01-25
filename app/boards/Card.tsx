'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '@/app/api/article.api';
import { ArticleResponseType } from '@/app/types/article';

export default function Card({ isBest }: { isBest?: boolean }) {
  const [articles, setArticles] =
    useState<ArticleResponseType['getArticles']>();
  //화면 크기에 따라 표시할 게시글 개수 저장하는 상태
  const [pageSize, setPageSize] = useState(isBest ? 3 : 10);

  //화면 크기에 따라 페이지 사이즈 업데이트
  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 640px)');
    const lgMediaQuery = window.matchMedia('(max-width: 1024px)');

    const updatePageSize = () => {
      if (smMediaQuery.matches) {
        setPageSize(isBest ? 1 : 10);
      } else if (lgMediaQuery.matches) {
        setPageSize(isBest ? 2 : 10);
      } else {
        setPageSize(isBest ? 3 : 10);
      }
    };

    updatePageSize();

    // 미디어 쿼리 변화 감지 리스너 등록
    smMediaQuery.addEventListener('change', updatePageSize);
    lgMediaQuery.addEventListener('change', updatePageSize);

    return () => {
      smMediaQuery.removeEventListener('change', updatePageSize);
      lgMediaQuery.removeEventListener('change', updatePageSize);
    };
  }, [isBest]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articles = await getArticles({
          orderBy: isBest ? 'like' : 'recent',
          pageSize,
        });
        setArticles(articles);
      } catch (error) {
        console.error('게시글 로드 실패:', error);
      }
    };

    loadArticles();
  }, [isBest, pageSize]);

  return articles;
}
