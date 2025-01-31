'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDetailsArticle } from '@/app/api/article.api';
import type { DetailedArticleType } from '@/app/types/article';
import commentIcon from '@/public/images/icons/ic_comment.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import PostActionDropdown from '@/app/boards/PostActionDropdown';
import LikeButton from '@/app/boards/LikeButton';
import useUserStore from '@/app/stores/userStore';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<DetailedArticleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUserStore();

  useEffect(() => {
    if (!articleId) return;

    const loadArticle = async () => {
      try {
        setLoading(true);
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

  const handleDeleteSuccess = () => {
    alert('삭제가 완료되었습니다!');
    router.push('/boards');
  };

  if (loading) return <p>로딩 중...</p>;
  if (!article) return null;

  return (
    <div className="mx-auto mt-14 flex w-[90%] flex-col sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full justify-between border-b border-gray-700 pb-4">
        <div className="flex w-full justify-between">
          <p className="flex-grow text-[18px] font-medium text-t-secondary">
            {article.title}
          </p>

          {article.image !== 'https://no-image/no-image.png' && (
            <div className="relative ml-auto h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-[8px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {user?.nickname === article.writer.nickname && (
          <PostActionDropdown
            onEdit={() => console.log(`수정: ${article.id}`)}
            onDeleteSuccess={handleDeleteSuccess}
            articleId={article.id}
          />
        )}
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

          <LikeButton
            articleId={article.id}
            initialLikeCount={article.likeCount}
            initialIsLiked={article.isLiked ?? false}
          />
        </div>
      </div>

      <p className="mt-4 w-full text-left text-t-secondary">
        {article.content}
      </p>
    </div>
  );
}
