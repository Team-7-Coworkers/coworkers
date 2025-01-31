'use client';

import { useState } from 'react';
import { postArticlesLike, deleteArticlesLike } from '@/app/api/article.api';
import Image from 'next/image';
import heartIcon from '@/public/images/icons/ic-heart.svg';

interface LikeButtonProps {
  articleId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

export default function LikeButton({
  articleId,
  initialLikeCount,
  initialIsLiked,
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);

      if (isLiked) {
        // 좋아요 취소하기
        await deleteArticlesLike({ articleId });
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        // 좋아요 추가하기
        await postArticlesLike({ articleId });
        setLikeCount((prev) => prev + 1);
      }

      setIsLiked((prev) => !prev);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <p
      className="flex cursor-pointer items-center space-x-1"
      onClick={handleLikeToggle}
    >
      <Image
        src={heartIcon}
        alt="하트 아이콘"
      />
      <span className="text-t-disabled">{likeCount}</span>
    </p>
  );
}
