'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDetailsArticle } from '@/app/api/article.api';
import type { DetailedArticleType } from '@/app/types/article';
import commentIcon from '@/public/images/icons/ic_comment.svg';
import heartIcon from '@/public/images/icons/ic-heart.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import PostActionDropdown from '@/app/boards/PostActionDropdown';

export default function ArticleDetail() {
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
    <div className="mx-auto mt-14 flex w-[90%] flex-col sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full justify-between border-b border-gray-700 pb-4">
        <p className="text-[18px] font-medium text-t-secondary">
          {article.title}
        </p>
        <PostActionDropdown
          onEdit={() => console.log(`수정: ${article.id}`)}
          onDeleteSuccess={() => console.log('삭제 완료 후 상태 업데이트')}
          articleId={article.id}
        />
      </div>

      <div className="mt-4 flex w-full items-center justify-between text-[14px]">
        <div className="flex items-center space-x-2">
          <p className="pr-3">{article.writer.nickname}</p>
          <span className="h-4 border-l border-gray-700"></span>
          <p className="text-t-secondary">
            {dayjs(article.createdAt).format('YYYY.MM.DD')}
          </p>
        </div>

        <div className="flex space-x-4">
          <p className="mr-1 flex items-center space-x-1">
            <Image
              src={commentIcon}
              alt="댓글 아이콘"
            />
            <span className="text-t-disabled">{article.commentCount}</span>
          </p>
          <p className="flex items-center space-x-1">
            <Image
              src={heartIcon}
              alt="하트 아이콘"
            />
            <span className="text-t-disabled">{article.likeCount}</span>
          </p>
        </div>
      </div>

      <p className="mt-4 w-full text-left text-t-secondary">
        {article.content}
      </p>
    </div>
  );
}
