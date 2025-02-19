'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getArticles } from '@/app/api/article.api';
import { ArticleResponseType } from '@/app/types/article';

export default function Card({
  isBest,
  currentPage,
  orderBy,
  keyword,
}: {
  isBest?: boolean;
  currentPage: number;
  orderBy: 'recent' | 'like';
  keyword?: string;
}) {
  //화면 크기에 따라 표시할 게시글 개수 저장하는 상태
  const [pageSize, setPageSize] = useState(isBest ? 3 : 6);

  // 화면 크기에 따라 페이지 사이즈 업데이트
  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 640px)');
    const lgMediaQuery = window.matchMedia('(max-width: 1024px)');

    const updatePageSize = () => {
      if (smMediaQuery.matches) {
        setPageSize(isBest ? 1 : 6);
      } else if (lgMediaQuery.matches) {
        setPageSize(isBest ? 2 : 6);
      } else {
        setPageSize(isBest ? 3 : 6);
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

  const { data: articles } = useQuery<ArticleResponseType['getArticles']>({
    queryKey: ['articles', currentPage, orderBy, keyword, pageSize],
    queryFn: () =>
      getArticles({
        page: currentPage,
        orderBy,
        pageSize,
        keyword,
      }),

    staleTime: 1000 * 60 * 5,
  });

  return articles;
}
