'use client';

import { useState } from 'react';
import { postArticlesLike, deleteArticlesLike } from '@/app/api/article.api';

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
  const [animate, setAnimate] = useState<boolean>(false);

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

      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <p
      className="relative flex cursor-pointer items-center space-x-1"
      onClick={handleLikeToggle}
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-200 ease-in-out ${
          animate ? 'scale-125' : 'scale-100'
        }`}
      >
        <path
          d="M2.55987 7.31157C2.41015 7.18016 2.29039 7.07475 2.2026 6.99739V6.95147L2.02687 6.77574C1.33306 6.08193 0.935938 5.16547 0.935938 4.2V4.07612C0.997406 2.2062 2.59447 0.666667 4.46927 0.666667C4.74755 0.666667 5.11676 0.763435 5.48481 0.961616C5.83214 1.14864 6.13701 1.40383 6.33945 1.68842C6.63394 2.31494 7.54174 2.30366 7.81413 1.65457C7.98187 1.36092 8.27586 1.0955 8.62818 0.899018C8.9958 0.693998 9.36226 0.6 9.6026 0.6C11.5319 0.6 13.0743 2.12742 13.1359 4.07581V4.2C13.1359 5.24201 12.7325 6.14473 12.0638 6.75771L11.8693 6.93606V6.97957C11.7682 7.06525 11.6379 7.17766 11.486 7.30974C11.1488 7.6029 10.6974 7.99999 10.2059 8.43321C10.0482 8.5722 9.88634 8.71492 9.72274 8.85919C8.8665 9.61426 7.96196 10.4119 7.3486 10.9417C7.17207 11.0861 6.8998 11.0861 6.72327 10.9417C5.99106 10.3093 4.82846 9.2962 3.8391 8.43155C3.34348 7.9984 2.89174 7.60286 2.55987 7.31157Z"
          className={`stroke-[1.2] ${
            isLiked
              ? 'fill-green-400 stroke-green-400'
              : 'fill-none stroke-gray-500'
          }`}
        />
      </svg>

      <span className="text-t-disabled">{likeCount}</span>
    </p>
  );
}
