'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDetailsArticle } from '@/app/api/article.api';
import type { DetailedArticleType } from '@/app/types/article';
import dayjs from 'dayjs';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<DetailedArticleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!articleId) return;

    const loadArticle = async () => {
      try {
        setLoading(true);

        // articleId를 숫자로 변환하기
        const articleIdNumber = Number(articleId);

        const data = await getDetailsArticle({ articleId: articleIdNumber });

        if ('message' in data) {
          setArticle(null);
        } else {
          setArticle(data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  if (loading) return <p>로딩 중...</p>;

  if (!article) return null;

  return (
    <div>
      <p>{article.title}</p>
      <p>작성자: {article.writer.nickname}</p>
      <p>작성날짜: {dayjs(article.createdAt).format('YYYY.MM.DD')}</p>
      <p>댓글 수: {article.commentCount}</p>
      <p>좋아요: {article.likeCount}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
